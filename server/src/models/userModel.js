import { ObjectId } from 'mongodb'
import { getDB } from '../config/db.js'

export const ROLES = ['customer', 'rider', 'vendor', 'admin']
const LEGACY_ROLE_MAP = { service_provider: 'vendor' }

export function normalizeRoles(user) {
  const rawRoles = Array.isArray(user.roles) ? user.roles : user.role ? [user.role] : ['customer']
  const normalizedRoles = [...new Set(rawRoles.map((role) => LEGACY_ROLE_MAP[role] || role).filter((role) => ROLES.includes(role)))]
  return normalizedRoles.length ? normalizedRoles : ['customer']
}

export function serializeUser(user) {
  const roles = normalizeRoles(user)
  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email || null,
    mobile: user.mobile || null,
    roles,
    activeRole: user.activeRole && roles.includes(user.activeRole) ? user.activeRole : null,
    status: user.status || 'active',
  }
}

export async function findUserByIdentifier(identifier) {
  const normalized = identifier.trim().toLowerCase()
  return getDB().collection('users').findOne({
    $or: [{ email: normalized }, { email: identifier.trim() }, { mobile: identifier.trim() }],
  })
}

export async function findUserByContact({ email, mobile }) {
  const contacts = []
  if (email) contacts.push({ email: email.trim().toLowerCase() }, { email: email.trim() })
  if (mobile) contacts.push({ mobile: mobile.trim() })
  return contacts.length ? getDB().collection('users').findOne({ $or: contacts }) : null
}

export async function findUserById(id) {
  if (!ObjectId.isValid(id)) return null
  return getDB().collection('users').findOne({ _id: new ObjectId(id) })
}

export async function createUser({ name, email, mobile, passwordHash, roles }) {
  const user = {
    name: name.trim(),
    passwordHash,
    roles,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  if (email) user.email = email.trim().toLowerCase()
  if (mobile) user.mobile = mobile.trim()
  const result = await getDB().collection('users').insertOne(user)
  return { ...user, _id: result.insertedId }
}

export async function addRoleToUser(id, role, roleData = {}) {
  if (!ObjectId.isValid(id)) return null

  const currentUser = await findUserById(id)
  if (!currentUser) return null

  const update = { $set: { updatedAt: new Date() } }
  if (Array.isArray(currentUser.roles)) {
    update.$addToSet = { roles: role }
  } else {
    update.$set.roles = [...new Set([...normalizeRoles(currentUser), role])]
  }

  if (role === 'rider') {
    update.$set.riderOnboarding = {
      vehicleType: roleData.vehicleType,
      city: roleData.city,
      verifiedAt: new Date(),
    }
  }

  if (role === 'vendor') {
    update.$set.vendorOnboarding = {
      businessName: roleData.businessName,
      businessCategory: roleData.businessCategory,
      city: roleData.city,
      verifiedAt: new Date(),
    }
  }

  await getDB().collection('users').updateOne({ _id: new ObjectId(id) }, update)
  return findUserById(id)
}

export async function updateVendorLocation(id, location) {
  if (!ObjectId.isValid(id)) return null
  await getDB().collection('users').updateOne(
    { _id: new ObjectId(id), $or: [{ roles: 'vendor' }, { role: 'vendor' }, { roles: 'service_provider' }] },
    { $set: { 'vendorOnboarding.businessName': location.businessName, 'vendorOnboarding.city': location.city, 'vendorOnboarding.address': location.address, 'vendorOnboarding.latitude': location.latitude, 'vendorOnboarding.longitude': location.longitude, updatedAt: new Date() } },
  )
  return findUserById(id)
}

export async function updateRiderLocation(id, location) {
  if (!ObjectId.isValid(id)) return null
  await getDB().collection('users').updateOne(
    { _id: new ObjectId(id), $or: [{ roles: 'rider' }, { role: 'rider' }] },
    { $set: { riderLocation: { latitude: location.latitude, longitude: location.longitude, accuracy: location.accuracy ?? null, updatedAt: new Date() }, updatedAt: new Date() } },
  )
  return findUserById(id)
}

export async function findVendorById(id) {
  if (!ObjectId.isValid(id)) return null
  return getDB().collection('users').findOne({
    _id: new ObjectId(id),
    $or: [{ roles: 'vendor' }, { role: 'vendor' }, { roles: 'service_provider' }],
  })
}
