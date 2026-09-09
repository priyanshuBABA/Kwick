import jwt from 'jsonwebtoken'
import { findUserById, normalizeRoles, serializeUser } from '../models/userModel.js'

function getJwtSecret() {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is required')
  return process.env.JWT_SECRET
}

export function createToken(user) {
  return jwt.sign({ sub: user._id.toString() }, getJwtSecret(), { expiresIn: '7d' })
}

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return res.status(401).json({ success: false, message: 'Authentication required' })

    const payload = jwt.verify(token, getJwtSecret())
    const user = await findUserById(payload.sub)
    if (!user || user.status === 'disabled') return res.status(401).json({ success: false, message: 'Session is invalid or expired' })

    req.user = user
    req.authUser = serializeUser(user)
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Session is invalid or expired' })
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    const roles = normalizeRoles(req.user || {})
    if (!roles.includes(role)) return res.status(403).json({ success: false, message: 'You are not authorized for this role' })
    next()
  }
}
