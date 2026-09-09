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
    throw new Error('Unable to connect to the rider order service')
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Rider order request failed')
  return data.data
}

function normalizeOrder(order) {
  return {
    ...order,
    id: order?._id,
    total: Number(order?.total || 0),
    items: Array.isArray(order?.items) ? order.items : [],
    shippingAddress: order?.shippingAddress || {},
    assignedRiderId: order?.assignedRiderId || null,
  }
}

export const getAvailableRiderOrders = async (token) => (await request('/api/rider/orders/available', token)).map(normalizeOrder)
export const getMyRiderOrders = async (token) => (await request('/api/rider/orders', token)).map(normalizeOrder)
export const getRiderOrderById = async (id, token) => normalizeOrder(await request(`/api/rider/orders/${encodeURIComponent(id)}`, token))
export const acceptRiderOrder = async (id, token) => normalizeOrder(await request(`/api/rider/orders/${encodeURIComponent(id)}/accept`, token, { method: 'POST' }))
export const declineRiderOrder = async (id, token, reason) => normalizeOrder(await request(`/api/rider/orders/${encodeURIComponent(id)}/decline`, token, {
  method: 'POST',
  body: JSON.stringify(reason ? { reason } : {}),
}))
export const updateRiderOrderStatus = async (id, status, token) => normalizeOrder(await request(`/api/rider/orders/${encodeURIComponent(id)}/status`, token, {
  method: 'PATCH',
  body: JSON.stringify({ status }),
}))
