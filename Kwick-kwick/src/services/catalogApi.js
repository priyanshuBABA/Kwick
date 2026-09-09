const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')

async function request(path) {
  let response
  try {
    response = await fetch(`${API_URL}${path}`)
  } catch {
    throw new Error('Unable to connect to the catalog service')
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Catalog request failed')
  return data
}

function buildQuery(params = {}) {
  const query = new URLSearchParams()
  if (params.page !== undefined) query.set('page', params.page)
  if (params.limit !== undefined) query.set('limit', params.limit)
  if (params.q) query.set('q', params.q)
  return query.toString()
}

export function normalizeProduct(product) {
  return {
    ...product,
    id: product._id || product.catalogKey || product.id,
    name: product.name || product.n || '',
    price: Number(product.price ?? product.p ?? 0),
    image: product.image || null,
    emoji: product.emoji || product.e || '📦',
    unit: product.unit || product.weight || '',
    category: product.category || '',
  }
}

export function normalizeService(service) {
  return {
    ...service,
    id: service._id || service.catalogKey || service.id,
    name: service.name || '',
    price: Number(service.price ?? service.startingPrice ?? 0),
    image: service.image || null,
    emoji: service.emoji || '🛠️',
    providerName: service.provider?.name || '',
    category: service.category || '',
  }
}

async function getCollection(path, normalize) {
  const response = await request(path)
  return {
    ...response,
    data: Array.isArray(response.data) ? response.data.map(normalize) : [],
  }
}

export function getProducts(params = {}) {
  const path = params.q
    ? `/api/products/search?${buildQuery(params)}`
    : params.category
      ? `/api/products/category/${encodeURIComponent(params.category)}?${buildQuery(params)}`
      : `/api/products?${buildQuery(params)}`
  return getCollection(path, normalizeProduct)
}

export async function getProductById(id) {
  const response = await request(`/api/products/${encodeURIComponent(id)}`)
  return { ...response, data: normalizeProduct(response.data) }
}

export function getProductsByCategory(category, params = {}) {
  return getProducts({ ...params, category })
}

export function searchProducts(query, params = {}) {
  return getProducts({ ...params, q: query })
}

export function getServices(params = {}) {
  const path = params.q
    ? `/api/services/search?${buildQuery(params)}`
    : params.category
      ? `/api/services/category/${encodeURIComponent(params.category)}?${buildQuery(params)}`
      : `/api/services?${buildQuery(params)}`
  return getCollection(path, normalizeService)
}

export async function getServiceById(id) {
  const response = await request(`/api/services/${encodeURIComponent(id)}`)
  return { ...response, data: normalizeService(response.data) }
}

export function getServicesByCategory(category, params = {}) {
  return getServices({ ...params, category })
}

export function searchServices(query, params = {}) {
  return getServices({ ...params, q: query })
}
