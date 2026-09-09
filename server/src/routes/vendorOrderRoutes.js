import { Router } from 'express'
import { requireAuth, requireRole } from '../middleware/authMiddleware.js'
import {
  findOrderByIdForVendor,
  findOrdersByVendor,
  orderBelongsOnlyToVendor,
  serializeVendorOrder,
  updateVendorOrderStatus,
} from '../models/orderModel.js'

const router = Router()
const STATUS_TRANSITIONS = {
  placed: 'confirmed',
  confirmed: 'preparing',
  preparing: 'ready',
}

router.use(requireAuth, requireRole('vendor'))

router.get('/', async (req, res) => {
  try {
    const orders = await findOrdersByVendor(req.user._id)
    return res.json({ success: true, data: orders.map((order) => serializeVendorOrder(order, req.user._id)) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load vendor orders' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const order = await findOrderByIdForVendor(req.params.id, req.user._id)
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' })
    return res.json({ success: true, data: serializeVendorOrder(order, req.user._id) })
  } catch {
    return res.status(404).json({ success: false, message: 'Order not found' })
  }
})

router.patch('/:id/status', async (req, res) => {
  const requestedStatus = req.body?.status
  if (typeof requestedStatus !== 'string') {
    return res.status(400).json({ success: false, message: 'status is required' })
  }

  try {
    const order = await findOrderByIdForVendor(req.params.id, req.user._id)
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' })
    if (!orderBelongsOnlyToVendor(order, req.user._id)) {
      return res.status(400).json({ success: false, message: 'Multi-vendor order status cannot be updated here' })
    }
    const currentVendorStatus = order.vendorStatus || (['placed', 'confirmed', 'preparing', 'ready'].includes(order.status) ? order.status : 'placed')
    if (STATUS_TRANSITIONS[currentVendorStatus] !== requestedStatus) {
      return res.status(400).json({ success: false, message: 'Invalid order status transition' })
    }

    const updatedOrder = await updateVendorOrderStatus(order._id.toString(), req.user._id, currentVendorStatus, requestedStatus)
    if (!updatedOrder) return res.status(409).json({ success: false, message: 'Order status changed; refresh and try again' })
    return res.json({ success: true, data: serializeVendorOrder(updatedOrder, req.user._id) })
  } catch {
    return res.status(400).json({ success: false, message: 'Unable to update order status' })
  }
})

export default router