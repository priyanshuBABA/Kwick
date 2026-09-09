import { Router } from 'express'
import { requireAuth, requireRole } from '../middleware/authMiddleware.js'
import {
  claimOrderForRider,
  declineOrderForRider,
  findAvailableOrdersForRider,
  findOrderByIdForRider,
  findOrdersByRider,
  serializeOrder,
  updateRiderOrderStatus,
} from '../models/orderModel.js'

const router = Router()
const RIDER_STATUS_TRANSITIONS = {
  rider_assigned: 'picked_up',
  picked_up: 'out_for_delivery',
  out_for_delivery: 'delivered',
}

router.use(requireAuth, requireRole('rider'))

function assertRiderStatusTransition(currentStatus, nextStatus) {
  if (currentStatus === 'rider_assigned' && nextStatus === 'picked_up') return true
  if (currentStatus === 'picked_up' && nextStatus === 'out_for_delivery') return true
  if (currentStatus === 'out_for_delivery' && nextStatus === 'delivered') return true
  return false
}

function serializeRiderOrder(order) {
  const serialized = serializeOrder(order)
  return {
    ...serialized,
    pickupLocations: serialized.pickupLocations || (serialized.pickupLocation ? [serialized.pickupLocation] : []),
    pickupAddress: serialized.pickupLocation?.address || serialized.pickupLocations?.[0]?.address || null,
    pickupLatitude: serialized.pickupLocation?.latitude ?? serialized.pickupLocations?.[0]?.latitude ?? null,
    pickupLongitude: serialized.pickupLocation?.longitude ?? serialized.pickupLocations?.[0]?.longitude ?? null,
    deliveryAddress: serialized.shippingAddress?.formattedAddress || serialized.shippingAddress?.addressLine1 || null,
    deliveryLatitude: serialized.shippingAddress?.latitude ?? null,
    deliveryLongitude: serialized.shippingAddress?.longitude ?? null,
  }
}

router.get('/available', async (req, res) => {
  try {
    const orders = await findAvailableOrdersForRider(req.user._id)
    return res.json({ success: true, data: orders.map((order) => {
      const serialized = serializeRiderOrder(order)
      return {
        _id: serialized._id,
        orderReference: serialized.orderReference || serialized._id,
        createdAt: serialized.createdAt,
        items: serialized.items,
        itemCount: serialized.items.length,
        total: serialized.total,
        paymentStatus: serialized.paymentStatus,
        pickupLocation: serialized.pickupLocation || null,
        pickupLocations: serialized.pickupLocations,
        pickupAddress: serialized.pickupAddress,
        pickupLatitude: serialized.pickupLatitude,
        pickupLongitude: serialized.pickupLongitude,
        deliveryAddress: serialized.deliveryAddress,
        deliveryLatitude: serialized.deliveryLatitude,
        deliveryLongitude: serialized.deliveryLongitude,
        status: serialized.status,
      }
    }) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load available rider orders' })
  }
})

router.get('/', async (req, res) => {
  try {
    const orders = await findOrdersByRider(req.user._id)
    return res.json({ success: true, data: orders.map(serializeRiderOrder) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load rider orders' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const order = await findOrderByIdForRider(req.params.id, req.user._id)
    if (!order) return res.status(404).json({ success: false, message: 'Order not found or not assigned to this rider' })
    return res.json({ success: true, data: serializeRiderOrder(order) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load order' })
  }
})

router.post('/:id/accept', async (req, res) => {
  try {
    const order = await claimOrderForRider(req.params.id, req.user._id)
    if (!order) {
      return res.status(409).json({ success: false, message: 'This order is no longer available for assignment' })
    }
    return res.status(200).json({ success: true, data: serializeRiderOrder(order), message: 'Order accepted successfully' })
  } catch {
    return res.status(400).json({ success: false, message: 'Unable to accept order' })
  }
})

router.post('/:id/decline', async (req, res) => {
  try {
    const reason = typeof req.body?.reason === 'string' ? req.body.reason.trim().slice(0, 500) : null
    const order = await declineOrderForRider(req.params.id, req.user._id, reason)
    if (!order) return res.status(409).json({ success: false, message: 'This order is no longer available to decline' })
    return res.json({ success: true, data: serializeOrder(order), message: 'Order declined' })
  } catch {
    return res.status(400).json({ success: false, message: 'Unable to decline order' })
  }
})

router.patch('/:id/status', async (req, res) => {
  const requestedStatus = req.body?.status
  if (typeof requestedStatus !== 'string') {
    return res.status(400).json({ success: false, message: 'status is required' })
  }

  try {
    const order = await findOrderByIdForRider(req.params.id, req.user._id)
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found or not assigned to this rider' })
    }
    if (!assertRiderStatusTransition(order.status, requestedStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid rider order status transition' })
    }
    if (order.status === 'rider_assigned' && order.vendorStatus !== 'ready') {
      return res.status(409).json({ success: false, message: 'Order cannot be picked up until vendor preparation is ready' })
    }
    const updatedOrder = await updateRiderOrderStatus(order._id.toString(), req.user._id, order.status, requestedStatus)
    if (!updatedOrder) return res.status(409).json({ success: false, message: 'Order status changed; refresh and try again' })
    return res.json({ success: true, data: serializeRiderOrder(updatedOrder) })
  } catch {
    return res.status(400).json({ success: false, message: 'Unable to update order status' })
  }
})

export default router
