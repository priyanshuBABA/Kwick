const OSRM_BASE_URL = (process.env.OSRM_BASE_URL || 'https://router.project-osrm.org').replace(/\/$/, '')

function validatePoint(point, label) {
  const latitude = Number(point?.latitude)
  const longitude = Number(point?.longitude)
  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90 || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
    throw new Error(`${label} coordinates are invalid`)
  }
  return { latitude, longitude }
}

export async function calculateRouteDistance({ origin, destination, waypoints = [] }) {
  const points = [validatePoint(origin, 'Origin'), ...waypoints.map((point, index) => validatePoint(point, `Waypoint ${index + 1}`)), validatePoint(destination, 'Destination')]
  const coordinates = points.map((point) => `${point.longitude},${point.latitude}`).join(';')
  const response = await fetch(`${OSRM_BASE_URL}/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=false`)
  if (!response.ok) throw new Error('Route provider was unavailable')
  const data = await response.json()
  const route = data?.routes?.[0]
  if (!route || !Number.isFinite(route.distance) || !Number.isFinite(route.duration)) throw new Error('No road route was found for these locations')
  return {
    distanceKm: Number((route.distance / 1000).toFixed(2)),
    durationMinutes: Number((route.duration / 60).toFixed(0)),
    geometry: route.geometry || null,
    provider: 'osrm',
  }
}

export function calculateMultiPickupRouteDistance({ pickups, delivery }) {
  if (!Array.isArray(pickups) || pickups.length === 0) throw new Error('At least one pickup location is required')
  return calculateRouteDistance({ origin: pickups[0], waypoints: pickups.slice(1), destination: delivery })
}
