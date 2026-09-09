const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    })
  } catch {
    throw new Error('Unable to connect to the server')
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Request failed')
  return data
}

export const loginRequest = (identifier, password) => request('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ identifier, password }),
})

export const registerRequest = (payload) => request('/api/auth/register', {
  method: 'POST',
  body: JSON.stringify(payload),
})

export const addRoleRequest = (role, onboarding = {}, token) => request('/api/auth/add-role', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({ role, onboarding }),
})

export const currentUserRequest = (token) => request('/api/auth/me', {
  headers: { Authorization: `Bearer ${token}` },
})
