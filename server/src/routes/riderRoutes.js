import { Router } from 'express'
import { requireAuth, requireRole } from '../middleware/authMiddleware.js'
import { updateRiderLocation } from '../models/userModel.js'

const router = Router()
router.use(requireAuth, requireRole('rider'))

router.patch('/location', async (req, res) => {
  const latitude = Number(req.body?.latitude)
  const longitude = Number(req.body?.longitude)
  const accuracy = req.body?.accuracy == null ? null : Number(req.body.accuracy)
  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90 || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) return res.status(400).json({ success: false, message: 'Valid latitude and longitude are required' })
  if (accuracy !== null && (!Number.isFinite(accuracy) || accuracy < 0)) return res.status(400).json({ success: false, message: 'Accuracy must be a valid positive number' })
  try {
    const rider = await updateRiderLocation(req.user._id, { latitude, longitude, accuracy })
    if (!rider) return res.status(404).json({ success: false, message: 'Rider account not found' })
    return res.json({ success: true, data: { latitude, longitude, accuracy, updatedAt: rider.riderLocation.updatedAt } })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to update rider location' })
  }
})

export default router