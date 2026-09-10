const NOMINATIM_URL = 'https://nominatim.openstreetmap.org'
const REQUEST_TIMEOUT_MS = 8000

function createTimeoutSignal() {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  return { controller, timeoutId }
}

async function requestNominatim(path) {
  const { controller, timeoutId } = createTimeoutSignal()
  try {
    const response = await fetch(`${NOMINATIM_URL}${path}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json', 'Accept-Language': 'en' },
    })

    if (response.status === 429) throw new Error('Location lookup is temporarily rate limited. Please retry shortly.')
    if (!response.ok) throw new Error('Location lookup failed. Please try again.')
    return response.json()
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('Location lookup timed out. Please try again.')
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

function normalizeAddress(data) {
  const address = data?.address || {}
  return {
    formattedAddress: data?.display_name || '',
    city: address.city || address.town || address.village || address.municipality || address.county || '',
    state: address.state || address.state_district || '',
    postalCode: address.postcode || '',
    country: address.country || '',
    placeId: data?.place_id ? String(data.place_id) : null,
  }
}

export async function reverseGeocode(latitude, longitude) {
  const data = await requestNominatim(`/reverse?format=jsonv2&lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}&zoom=18&addressdetails=1`)
  if (!data?.display_name) throw new Error('No readable address was found for this location.')
  return normalizeAddress(data)
}

export async function geocodeAddress(query) {
  const matches = await searchAddresses(query)
  const result = matches[0]
  if (!result) throw new Error('No location was found for that address.')
  return result
}

export async function searchAddresses(query) {
  const trimmedQuery = String(query || '').trim()
  if (!trimmedQuery) throw new Error('Enter an address to search.')
  const data = await requestNominatim(`/search?format=jsonv2&q=${encodeURIComponent(trimmedQuery)}&addressdetails=1&limit=5`)
  return (Array.isArray(data) ? data : [])
    .filter((result) => result?.lat && result?.lon)
    .map((result) => ({ latitude: Number(result.lat), longitude: Number(result.lon), ...normalizeAddress(result) }))
}
