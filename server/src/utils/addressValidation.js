const ADDRESS_FIELDS = ['name', 'phone', 'addressLine1', 'addressLine2', 'city', 'state', 'postalCode', 'landmark', 'formattedAddress']
const REQUIRED_ADDRESS_FIELDS = ['name', 'phone', 'addressLine1', 'city', 'state', 'postalCode']

function normalizeCoordinate(value, field) {
  if (value === undefined || value === null) return null
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`${field} must be a valid coordinate`)
  }
  const inRange = field === 'latitude'
    ? value >= -90 && value <= 90
    : value >= -180 && value <= 180
  if (!inRange) throw new Error(`${field} must be a valid coordinate`)
  return value
}

export function normalizeAddress(value) {
  if (value === undefined || value === null) {
    throw new Error('Complete shipping address is required')
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('shippingAddress must be an object')
  }

  const address = Object.fromEntries(
    ADDRESS_FIELDS
      .map((field) => [field, String(value[field] || '').trim()])
      .filter(([, fieldValue]) => fieldValue)
  )
  const latitude = normalizeCoordinate(value.latitude, 'latitude')
  const longitude = normalizeCoordinate(value.longitude, 'longitude')
  if ((latitude === null) !== (longitude === null)) {
    throw new Error('latitude and longitude must be provided together')
  }
  if (latitude !== null) {
    address.latitude = latitude
    address.longitude = longitude
  }

  const hasGpsAddress = latitude !== null && longitude !== null
  const hasLegacyAddress = REQUIRED_ADDRESS_FIELDS.every((field) => Boolean(address[field]))
  if (!hasGpsAddress && !hasLegacyAddress) {
    throw new Error('Complete shipping address is required')
  }

  return address
}
