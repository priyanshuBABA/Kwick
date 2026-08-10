const authService = {
  login: async (payload) => {
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
  },
  register: async (payload) => {
    const email = payload.email || '';
    const roles = payload.roles || ['customer'];
    return {
      success: true,
      token: 'mock-token',
      user: { _id: 'mock', name: payload.name || 'New User', email },
      roles,
    };
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
