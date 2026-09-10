const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')

async function request(path, token, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(options.headers || {}) },
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Vendor product request failed')
  return data.data
}

export const getVendorProducts = (token) => request('/api/vendor/products', token)
export const createVendorProduct = (product, token) => request('/api/vendor/products', token, { method: 'POST', body: JSON.stringify(product) })
export const updateVendorProduct = (id, product, token) => request(`/api/vendor/products/${encodeURIComponent(id)}`, token, { method: 'PATCH', body: JSON.stringify(product) })
export const deactivateVendorProduct = (id, token) => request(`/api/vendor/products/${encodeURIComponent(id)}`, token, { method: 'DELETE' })