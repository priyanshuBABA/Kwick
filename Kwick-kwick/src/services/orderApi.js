const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')

async function request(path, token, options = {}) {
  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    })
  } catch {
    throw new Error('Unable to connect to the order service')
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Order request failed')
  return data.data
}

function formatOrderDate(value) {
  if (!value) return 'Date unavailable'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Date unavailable'
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function normalizeOrder(order) {
  const items = Array.isArray(order?.items) ? order.items : []
  const firstItem = items[0]
  return {
    ...order,
    id: order?._id,
    id_num: order?._id,
    date: formatOrderDate(order?.createdAt),
    store: firstItem?.name || 'Kwick Order',
    e: firstItem?.image ? null : '📦',
    items,
  }
}

export const createOrder = (payload, token) => request('/api/orders', token, {
  method: 'POST',
  body: JSON.stringify(payload),
})

export const estimateOrder = (payload, token) => request('/api/orders/estimate', token, {
  method: 'POST',
  body: JSON.stringify(payload),
})

export const getOrderById = async (id, token) => normalizeOrder(await request(`/api/orders/${encodeURIComponent(id)}`, token))

export const getMyOrders = async (token) => (await request('/api/orders', token)).map(normalizeOrder)