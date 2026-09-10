const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')

export async function previewRoute({ pickups, delivery }, token) {
  const params = new URLSearchParams({
    deliveryLatitude: String(delivery.latitude),
    deliveryLongitude: String(delivery.longitude),
    pickups: JSON.stringify(pickups.map(({ latitude, longitude }) => ({ latitude, longitude }))),
  })
  const response = await fetch(`${API_URL}/api/osrm/route?${params}`, { headers: { Authorization: `Bearer ${token}` } })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Unable to calculate a road route')
  return data.data
}
