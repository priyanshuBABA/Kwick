import { ObjectId } from 'mongodb'
import { findCartByUserId } from '../models/cartModel.js'
import { findProductById } from '../models/productModel.js'
import { findVendorById } from '../models/userModel.js'
import { normalizeVendorLocation } from './vendorLocationValidation.js'
import { calculateMultiPickupRouteDistance } from './routeService.js'
import { calculateDeliveryFare } from './fare.js'

function parseCartQuantity(value) {
  return Number.isInteger(value) && value > 0 ? value : null
}

export async function buildOrderQuote(userId, shippingAddress) {
  const cart = await findCartByUserId(userId)
  if (!cart?.items?.length) throw new Error('Cart is empty')

  const items = []
  for (const cartItem of cart.items) {
    const quantity = parseCartQuantity(cartItem.quantity)
    if (!quantity) throw new Error('Cart contains an invalid quantity')
    const product = await findProductById(cartItem.productId)
    if (!product) throw new Error('A cart product is unavailable')
    if (Number.isInteger(product.stock) && quantity > product.stock) throw new Error(`${product.name} has only ${product.stock} item${product.stock === 1 ? '' : 's'} available.`)
    if (!product.name || !Number.isFinite(Number(product.price)) || Number(product.price) < 0) throw new Error('A cart product has incomplete pricing data')
    const price = Number(product.price)
    const orderItem = { productId: product._id, name: product.name, image: product.image || null, unit: product.unit || product.weight || '', quantity, price, lineTotal: price * quantity }
    if (product.vendorId && ObjectId.isValid(product.vendorId)) orderItem.vendorId = new ObjectId(product.vendorId)
    items.push(orderItem)
  }

  const vendorIds = [...new Set(items.filter((item) => item.vendorId).map((item) => item.vendorId.toString()))]
  if (items.some((item) => !item.vendorId)) {
    throw new Error('A cart product is not assigned to a vendor. Please contact the administrator.')
  }
  const pickupLocations = []
  for (const vendorId of vendorIds) {
    const vendor = await findVendorById(vendorId)
    if (!vendor) throw new Error('A cart vendor account is unavailable')
    try {
      const location = normalizeVendorLocation({ businessName: vendor.vendorOnboarding?.businessName, city: vendor.vendorOnboarding?.city, address: vendor.vendorOnboarding?.address, latitude: vendor.vendorOnboarding?.latitude, longitude: vendor.vendorOnboarding?.longitude })
      pickupLocations.push({ vendorId: new ObjectId(vendorId), ...location })
    } catch {
      throw new Error(`Vendor pickup location is not configured for ${vendor.vendorOnboarding?.businessName || 'this vendor'}.`)
    }
  }

  const deliveryRoute = await calculateMultiPickupRouteDistance({ pickups: pickupLocations, delivery: shippingAddress })
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0)
  return {
    items,
    pickupLocations,
    subtotal,
    deliveryFee: calculateDeliveryFare(deliveryRoute.distanceKm),
    deliveryRoute: { distanceKm: deliveryRoute.distanceKm, durationMinutes: deliveryRoute.durationMinutes, provider: deliveryRoute.provider },
  }
}
