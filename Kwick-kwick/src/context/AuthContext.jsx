import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('kwick-token') || '');
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
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

    // No remote logout needed for local mock auth-only mode.
    // The app clears local storage and session state only.
  };

  const value = { user, token, roles, loading, setLoading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
