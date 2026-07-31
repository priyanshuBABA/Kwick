import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('kwick-token') || '');
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('kwick-auth');
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        setUser(parsed.user || null);
        setRoles(parsed.roles || []);
        setToken(parsed.token || '');
      } catch {
        localStorage.removeItem('kwick-auth');
      }
    }
  }, []);

  const login = (authData) => {
    const nextUser = authData.user;
    const nextRoles = authData.roles || [];
    setUser(nextUser);
    setRoles(nextRoles);
    setToken(authData.token);
    localStorage.setItem('kwick-token', authData.token);
    localStorage.setItem('kwick-auth', JSON.stringify(authData));
  };

  const logout = async () => {
    const currentUser = user;
    const currentToken = token;
    setUser(null);
    setRoles([]);
    setToken('');
    localStorage.removeItem('kwick-token');
    localStorage.removeItem('kwick-auth');
    localStorage.removeItem('selected-role');

    if (currentUser?.email && currentToken) {
      try {
        await fetch(`${API_URL}/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentToken}`,
          },
          body: JSON.stringify({ email: currentUser.email, role: (currentUser.roles && currentUser.roles[0]) || 'customer' }),
        });
      } catch (error) {
        console.error('Logout sync failed:', error);
      }
    }
  };

  const value = useMemo(() => ({ user, token, roles, loading, setLoading, login, logout }), [user, token, roles, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
