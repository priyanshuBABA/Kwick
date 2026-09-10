const numberFromEnv = (name, fallback) => {
  const value = Number(process.env[name])
  return Number.isFinite(value) ? value : fallback
}

export const FARE_CONFIG = {
  baseFare: numberFromEnv('DELIVERY_BASE_FARE', 25),
  includedDistanceKm: numberFromEnv('DELIVERY_INCLUDED_DISTANCE_KM', 2),
  perKmRate: numberFromEnv('DELIVERY_PER_KM_RATE', 8),
  minimumFare: numberFromEnv('DELIVERY_MINIMUM_FARE', 25),
  platformFee: numberFromEnv('DELIVERY_PLATFORM_FEE', 0),
}

export function calculateDeliveryFare(distanceKm) {
  const distance = Number(distanceKm)
  if (!Number.isFinite(distance) || distance < 0) throw new Error('Route distance is invalid')
  const variableFare = Math.max(0, distance - FARE_CONFIG.includedDistanceKm) * FARE_CONFIG.perKmRate
  return Number(Math.max(FARE_CONFIG.minimumFare, FARE_CONFIG.baseFare + variableFare + FARE_CONFIG.platformFee).toFixed(2))
}
