function normalizeCoordinate(value, field) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`${field} must be a valid coordinate`)
  }
  const inRange = field === 'latitude'
    ? value >= -90 && value <= 90
    : value >= -180 && value <= 180
  if (!inRange) throw new Error(`${field} must be between ${field === 'latitude' ? '-90 and 90' : '-180 and 180'}`)
  return value
}

export function normalizeVendorLocation(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Vendor location must be an object')
  }

  const businessName = typeof value.businessName === 'string' ? value.businessName.trim() : ''
  const city = typeof value.city === 'string' ? value.city.trim() : ''
  const address = typeof value.address === 'string' ? value.address.trim() : ''
  if (!businessName || !city || !address) {
    throw new Error('businessName, city, and address are required')
  }

  const hasLatitude = value.latitude !== undefined && value.latitude !== null
  const hasLongitude = value.longitude !== undefined && value.longitude !== null
  if (hasLatitude !== hasLongitude) {
    throw new Error('latitude and longitude must be provided together')
  }
  if (!hasLatitude) throw new Error('latitude and longitude are required for vendor pickup')

  return {
    businessName,
    city,
    address,
    latitude: normalizeCoordinate(value.latitude, 'latitude'),
    longitude: normalizeCoordinate(value.longitude, 'longitude'),
  }
}