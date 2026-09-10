const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')

async function request(path, token, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(options.headers || {}) },
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Vendor profile request failed')
  return data.data
}

export const getVendorLocation = (token) => request('/api/vendor/profile/location', token)
export const saveVendorLocation = (location, token) => request('/api/vendor/profile/location', token, { method: 'PUT', body: JSON.stringify(location) })
