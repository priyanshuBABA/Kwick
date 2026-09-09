import { ObjectId } from 'mongodb'
import { Router } from 'express'
import { requireAuth } from '../middleware/authMiddleware.js'
import { clearCartForUser, findCartByUserId } from '../models/cartModel.js'
import { findProductById } from '../models/productModel.js'
import {
  createOrder,
  findOrderById,
  findOrdersByUser,
  serializeOrder,
} from '../models/orderModel.js'
import { findVendorById } from '../models/userModel.js'
import { normalizeAddress } from '../utils/addressValidation.js'
import { normalizeVendorLocation } from '../utils/vendorLocationValidation.js'

const router = Router()
router.use(requireAuth)

function parseCartQuantity(value) {
  return Number.isInteger(value) && value > 0 ? value : null
}

router.post('/', async (req, res) => {
  const body = req.body || {}
  let shippingAddress
  try {
    shippingAddress = normalizeAddress(body.shippingAddress)
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }

  try {
    const userId = req.user._id
    const cart = await findCartByUserId(userId)
    if (!cart?.items?.length) {
      return res.status(400).json({ success: false, message: 'Cart is empty' })
    }

    const items = []
    for (const cartItem of cart.items) {
      const quantity = parseCartQuantity(cartItem.quantity)
      if (!quantity) {
        return res.status(400).json({ success: false, message: 'Cart contains an invalid quantity' })
      }

      const product = await findProductById(cartItem.productId)
      if (!product) {
        return res.status(404).json({ success: false, message: 'A cart product is unavailable' })
      }
      if (!product.name || !Number.isFinite(Number(product.price)) || Number(product.price) < 0) {
        return res.status(400).json({ success: false, message: 'A cart product has incomplete pricing data' })
      }

      const price = Number(product.price)
      const orderItem = {
        productId: product._id,
        name: product.name,
        image: product.image || null,
        unit: product.unit || product.weight || '',
        quantity,
        price,
        lineTotal: price * quantity,
      }
      if (product.vendorId && ObjectId.isValid(product.vendorId)) orderItem.vendorId = new ObjectId(product.vendorId)
      items.push(orderItem)
    }

    const vendorIds = [...new Set(items.filter((item) => item.vendorId).map((item) => item.vendorId.toString()))]
    const pickupLocations = []
    for (const vendorId of vendorIds) {
      const vendor = await findVendorById(vendorId)
      if (!vendor) return res.status(400).json({ success: false, message: 'A cart vendor account is unavailable' })
      try {
        const location = normalizeVendorLocation({
          businessName: vendor.vendorOnboarding?.businessName,
          city: vendor.vendorOnboarding?.city,
          address: vendor.vendorOnboarding?.address,
          latitude: vendor.vendorOnboarding?.latitude,
          longitude: vendor.vendorOnboarding?.longitude,
        })
        pickupLocations.push({ vendorId: new ObjectId(vendorId), ...location })
      } catch {
        return res.status(400).json({ success: false, message: `Vendor pickup location is not configured for ${vendor.vendorOnboarding?.businessName || 'this vendor'}.` })
      }
    }

    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0)
    const deliveryFee = 0
    const tax = 0
    const discount = 0
    const total = Math.max(0, subtotal + deliveryFee + tax - discount)
    const order = await createOrder({
      userId,
      items,
      subtotal,
      deliveryFee,
      tax,
      discount,
      total,
      status: 'placed',
      vendorStatus: 'placed',
      riderStatus: 'unassigned',
      pickupLocation: pickupLocations.length === 1 ? pickupLocations[0] : null,
      pickupLocations,
      paymentStatus: 'pending',
      paymentMethod: typeof body.paymentMethod === 'string' ? body.paymentMethod : null,
      shippingAddress,
    })

    await clearCartForUser(userId)
    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: serializeOrder(order),
    })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to create order' })
  }
})

router.get('/', async (req, res) => {
  try {
    const orders = await findOrdersByUser(req.user._id)
    return res.json({ success: true, data: orders.map(serializeOrder) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load orders' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const order = await findOrderById(req.params.id, req.user._id)
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' })
    return res.json({ success: true, data: serializeOrder(order) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load order' })
  }
})

export default router