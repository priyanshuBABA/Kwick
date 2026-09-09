import { Router } from 'express'
import { requireAuth, requireRole } from '../middleware/authMiddleware.js'
import { findVendorById, updateVendorLocation } from '../models/userModel.js'
import { normalizeVendorLocation } from '../utils/vendorLocationValidation.js'

const router = Router()
router.use(requireAuth, requireRole('vendor'))

function serializeVendorLocation(user) {
  const onboarding = user?.vendorOnboarding || {}
  return {
    businessName: onboarding.businessName || '',
    city: onboarding.city || '',
    address: onboarding.address || '',
    latitude: onboarding.latitude ?? null,
    longitude: onboarding.longitude ?? null,
  }
}

router.get('/location', async (req, res) => {
  try {
    const vendor = await findVendorById(req.user._id)
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor account not found' })
    return res.json({ success: true, data: serializeVendorLocation(vendor) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load vendor location' })
  }
})

router.put('/location', async (req, res) => {
  let location
  try {
    location = normalizeVendorLocation(req.body)
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }

  try {
    const vendor = await updateVendorLocation(req.user._id, location)
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor account not found' })
    return res.json({ success: true, data: serializeVendorLocation(vendor) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to save vendor location' })
  }
})

export default router