import { Router } from 'express'
import { requireAuth } from '../middleware/authMiddleware.js'
import { clearCartForUser } from '../models/cartModel.js'
import {
  createOrder,
  findOrderById,
  findOrdersByUser,
  serializeCustomerOrder,
  serializeOrder,
} from '../models/orderModel.js'
import { normalizeAddress } from '../utils/addressValidation.js'
import { buildOrderQuote } from '../utils/orderQuote.js'
import { reserveProductStock, restoreProductStock } from '../models/productModel.js'

const router = Router()
router.use(requireAuth)

router.post('/', async (req, res) => {
  const body = req.body || {}
  let shippingAddress
  try {
    shippingAddress = normalizeAddress(body.shippingAddress)
    if (!Number.isFinite(shippingAddress.latitude) || !Number.isFinite(shippingAddress.longitude)) {
      return res.status(400).json({ success: false, message: 'A map-selected delivery location is required' })
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }

  try {
    const userId = req.user._id
    let quote
    try {
      quote = await buildOrderQuote(userId, shippingAddress)
    } catch (error) {
      const status = /route provider|no road route|road route was unavailable/i.test(error.message) ? 502 : 400
      return res.status(status).json({ success: false, message: error.message })
    }
    const { items, pickupLocations, subtotal, deliveryFee, deliveryRoute } = quote
    let reservedItems
    try {
      reservedItems = await reserveProductStock(items)
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message })
    }
    const tax = 0
    const discount = 0
    const total = Math.max(0, subtotal + deliveryFee + tax - discount)
    let order
    try {
      order = await createOrder({
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
      deliveryRoute: {
        distanceKm: deliveryRoute.distanceKm,
        durationMinutes: deliveryRoute.durationMinutes,
        calculatedAt: new Date(),
        provider: deliveryRoute.provider,
      },
      paymentStatus: 'pending',
      paymentMethod: typeof body.paymentMethod === 'string' ? body.paymentMethod : null,
      shippingAddress,
      })
    } catch (error) {
      await restoreProductStock(reservedItems)
      throw error
    }

    await clearCartForUser(userId)
    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: await serializeCustomerOrder(order),
    })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to create order' })
  }
})

router.post('/estimate', async (req, res) => {
  try {
    const shippingAddress = normalizeAddress(req.body?.shippingAddress)
    if (!Number.isFinite(shippingAddress.latitude) || !Number.isFinite(shippingAddress.longitude)) return res.status(400).json({ success: false, message: 'A map-selected delivery location is required' })
    const quote = await buildOrderQuote(req.user._id, shippingAddress)
    return res.json({ success: true, data: { subtotal: quote.subtotal, deliveryFee: quote.deliveryFee, total: quote.subtotal + quote.deliveryFee, deliveryRoute: quote.deliveryRoute } })
  } catch (error) {
    return res.status(/route provider|no road route|road route was unavailable/i.test(error.message) ? 502 : 400).json({ success: false, message: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const orders = await findOrdersByUser(req.user._id)
    return res.json({ success: true, data: await Promise.all(orders.map(serializeCustomerOrder)) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load orders' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const order = await findOrderById(req.params.id, req.user._id)
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' })
    return res.json({ success: true, data: await serializeCustomerOrder(order) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load order' })
  }
})

export default router