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
    throw new Error('Unable to connect to the cart service')
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Cart request failed')
  return data.data
}

export const getCart = (token) => request('/api/cart', token)

export const getCartCount = (token) => request('/api/cart/count', token)

export const addCartItem = (productId, quantity, token) => request('/api/cart/items', token, {
  method: 'POST',
  body: JSON.stringify({ productId, quantity }),
})

export const updateCartItem = (productId, quantity, token) => request(`/api/cart/items/${encodeURIComponent(productId)}`, token, {
  method: 'PATCH',
  body: JSON.stringify({ quantity }),
})

export const removeCartItem = (productId, token) => request(`/api/cart/items/${encodeURIComponent(productId)}`, token, {
  method: 'DELETE',
})

export const clearCart = (token) => request('/api/cart', token, {
  method: 'DELETE',
})
