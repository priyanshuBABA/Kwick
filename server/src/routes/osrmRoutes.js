import { Router } from 'express'
import { requireAuth } from '../middleware/authMiddleware.js'
import { calculateMultiPickupRouteDistance } from '../utils/routeService.js'
import { calculateDeliveryFare } from '../utils/fare.js'

const router = Router()

router.get('/status', (_req, res) => {
  res.json({ success: true, service: 'osrm', message: 'OSRM route service is ready' })
})

router.get('/route', requireAuth, async (req, res) => {
  try {
    const pickups = JSON.parse(req.query.pickups || '[]')
    const delivery = { latitude: Number(req.query.deliveryLatitude), longitude: Number(req.query.deliveryLongitude) }
    const route = await calculateMultiPickupRouteDistance({ pickups, delivery })
    return res.json({ success: true, data: { ...route, deliveryFee: calculateDeliveryFare(route.distanceKm) } })
  } catch (error) {
    const status = /route provider|no road route|road route was unavailable/i.test(error.message || '') ? 502 : 400
    return res.status(status).json({ success: false, message: error.message || 'Unable to calculate a road route' })
  }
})

export default router
