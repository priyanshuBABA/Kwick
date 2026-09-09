import { Router } from 'express'
import { getDB } from '../config/db.js'
import { requireAuth, requireRole } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', requireAuth, requireRole('customer'), async (req, res) => {
  try {
    const history = await getDB().collection('rideHistory').find({ userId: req.user._id }).sort({ createdAt: -1 }).toArray()
    return res.json({ success: true, history })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
})

export default router
