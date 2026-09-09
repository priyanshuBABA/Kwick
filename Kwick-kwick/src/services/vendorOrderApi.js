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
    throw new Error('Unable to connect to the vendor order service')
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Vendor order request failed')
  return data.data
}

function normalizeVendorOrder(order) {
  return {
    ...order,
    id: order._id,
    items: (order.items || []).map((item) => ({
      ...item,
      label: `${item.quantity}x ${item.name}`,
    })),
    amount: Number(order.vendorSubtotal || 0),
  }
}

export const getVendorOrders = async (token) => (await request('/api/vendor/orders', token)).map(normalizeVendorOrder)

export const getVendorOrderById = async (id, token) => normalizeVendorOrder(await request(`/api/vendor/orders/${encodeURIComponent(id)}`, token))

export const updateVendorOrderStatus = async (id, status, token) => normalizeVendorOrder(await request(`/api/vendor/orders/${encodeURIComponent(id)}/status`, token, {
  method: 'PATCH',
  body: JSON.stringify({ status }),
}))
