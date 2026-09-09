import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { createToken, requireAuth } from '../middleware/authMiddleware.js'
import { addRoleToUser, createUser, findUserByContact, findUserByIdentifier, normalizeRoles, serializeUser, ROLES } from '../models/userModel.js'

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, mobile, password, role = 'customer' } = req.body || {}
    const normalizedName = typeof name === 'string' ? name.trim() : ''
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''
    const normalizedMobile = typeof mobile === 'string' ? mobile.trim() : ''
    if (!normalizedName || (!normalizedEmail && !normalizedMobile) || typeof password !== 'string' || !password) {
      return res.status(400).json({ success: false, message: 'Name, email or mobile, and password are required' })
    }
    if (password.length < 8) return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' })
    if (!ROLES.includes(role) || role === 'admin') return res.status(400).json({ success: false, message: 'Invalid registration role' })

    const existingUser = await findUserByContact({ email: normalizedEmail, mobile: normalizedMobile })
    if (existingUser) return res.status(409).json({ success: false, message: 'This email/mobile is already registered. Please log in.' })

    try {
      const user = await createUser({ name: normalizedName, email: normalizedEmail, mobile: normalizedMobile, passwordHash: await bcrypt.hash(password, 12), roles: [role] })
      return res.status(201).json({ success: true, token: createToken(user), user: serializeUser(user), roles: normalizeRoles(user) })
    } catch (error) {
      if (error?.code === 11000) return res.status(409).json({ success: false, message: 'This email/mobile is already registered. Please log in.' })
      throw error
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to create account' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body || {}
    const normalizedIdentifier = typeof identifier === 'string' ? identifier.trim() : ''
    if (!normalizedIdentifier || typeof password !== 'string' || !password) return res.status(400).json({ success: false, message: 'Email or mobile and password are required' })

    const user = await findUserByIdentifier(normalizedIdentifier)
    if (!user || !(await bcrypt.compare(password, user.passwordHash || ''))) return res.status(401).json({ success: false, message: 'Invalid email/mobile or password' })
    if (user.status === 'disabled') return res.status(403).json({ success: false, message: 'This account is disabled' })

    return res.json({ success: true, token: createToken(user), user: serializeUser(user), roles: normalizeRoles(user) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to log in right now' })
  }
})

router.post('/add-role', requireAuth, async (req, res) => {
  try {
    const { onboarding = {} } = req.body || {}
    const requestedRole = typeof req.body?.role === 'string' ? req.body.role.trim().toLowerCase() : ''
    const role = requestedRole === 'service_provider' ? 'vendor' : requestedRole
    const addableRoles = ROLES.filter((availableRole) => availableRole !== 'admin')

    if (!addableRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' })
    }

    const currentRoles = normalizeRoles(req.user)
    if (currentRoles.includes(role)) {
      return res.json({ success: true, user: serializeUser(req.user), roles: currentRoles })
    }

    if (role === 'rider') {
      if (!['bike', 'scooter', 'car'].includes(onboarding.vehicleType) || !onboarding.city?.trim() || onboarding.acceptedTerms !== true) {
        return res.status(400).json({ success: false, message: 'Complete rider onboarding before adding the rider role' })
      }
    }

    if (role === 'vendor') {
      if (!onboarding.businessName?.trim() || !onboarding.businessCategory?.trim() || !onboarding.city?.trim() || onboarding.acceptedTerms !== true) {
        return res.status(400).json({ success: false, message: 'Complete service provider onboarding before adding the vendor role' })
      }
    }

    const user = await addRoleToUser(req.user._id, role, onboarding)
    if (!user) return res.status(404).json({ success: false, message: 'User account not found' })

    return res.json({ success: true, user: serializeUser(user), roles: normalizeRoles(user) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to add role right now' })
  }
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ success: true, user: req.authUser, roles: req.authUser.roles })
})

export default router
