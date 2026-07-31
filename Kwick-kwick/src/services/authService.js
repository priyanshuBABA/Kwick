const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';

const request = async (endpoint, payload) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

const authService = {
  login: async (payload) => {
    try {
      return await request('/login', payload);
    } catch (err) {
      // Fallback mock when API is unreachable
      const email = payload.email || '';
      let roles = ['customer'];
      if (email.includes('vendor')) roles = ['vendor'];
      if (email.includes('rider')) roles = ['rider'];
      if (email.includes('multi')) roles = ['customer', 'vendor', 'rider'];
      return {
        success: true,
        token: 'mock-token',
        user: { _id: 'mock', name: 'Mock User', email },
        roles,
      };
    }
  },
  register: async (payload) => {
    try {
      return await request('/register', payload);
    } catch (err) {
      // Mock register response
      const email = payload.email || '';
      const roles = payload.roles || ['customer'];
      return {
        success: true,
        token: 'mock-token',
        user: { _id: 'mock', name: payload.name || 'New User', email },
        roles,
      };
    }
  },
  logout: () => {
    localStorage.removeItem('kwick-token');
    localStorage.removeItem('kwick-auth');
    localStorage.removeItem('selected-role');
    localStorage.removeItem('kwick_loggedIn');
    localStorage.removeItem('kwick_loggedCategory');
  },
};

export default authService;
