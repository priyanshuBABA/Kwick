import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { addRoleRequest, currentUserRequest, loginRequest, registerRequest } from '../services/authApi';

const AuthContext = createContext(null);
const normalizeRoles = (nextRoles) => [...new Set(nextRoles.map((role) => role === 'service_provider' ? 'vendor' : role))];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('kwick-token') || '');
  const [roles, setRoles] = useState([]);
  const [activeRole, setActiveRole] = useState(localStorage.getItem('selected-role') || '');
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    setUser(null);
    setRoles([]);
    setActiveRole('');
    setToken('');
    localStorage.removeItem('kwick-token');
    localStorage.removeItem('kwick-auth');
    sessionStorage.removeItem('kwick-token');
    sessionStorage.removeItem('kwick-auth');
    localStorage.removeItem('selected-role');
  }, []);

  useEffect(() => {
    const savedAuth = localStorage.getItem('kwick-auth') || sessionStorage.getItem('kwick-auth');
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        setUser(parsed.user || null);
        const nextRoles = normalizeRoles(parsed.roles || parsed.user?.roles || []);
        setRoles(nextRoles);
        setActiveRole(parsed.activeRole || localStorage.getItem('selected-role') || '');
        setToken(parsed.token || '');
      } catch {
        localStorage.removeItem('kwick-auth');
      }
    }
    const savedToken = localStorage.getItem('kwick-token') || sessionStorage.getItem('kwick-token');
    if (savedToken) {
      currentUserRequest(savedToken).then((data) => {
        setUser(data.user);
        setRoles(normalizeRoles(data.roles || data.user.roles || []));
      }).catch(() => logout()).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [logout]);

  const saveAuth = (authData, remember = true) => {
    const nextUser = authData.user;
    const nextRoles = normalizeRoles(authData.roles || nextUser.roles || []);
    setUser(nextUser);
    setRoles(nextRoles);
    setToken(authData.token);
    const nextActiveRole = nextRoles.length === 1 ? nextRoles[0] : '';
    setActiveRole(nextActiveRole);
    localStorage.removeItem('selected-role');
    localStorage.removeItem('kwick-token');
    localStorage.removeItem('kwick-auth');
    sessionStorage.removeItem('kwick-token');
    sessionStorage.removeItem('kwick-auth');
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('kwick-token', authData.token);
    storage.setItem('kwick-auth', JSON.stringify({ ...authData, activeRole: nextActiveRole }));
    return { ...authData, roles: nextRoles };
  };

  const login = async (identifier, password, remember = true) => saveAuth(await loginRequest(identifier, password), remember);
  const register = async (payload) => saveAuth(await registerRequest(payload));

  const addRole = async (role, onboarding = {}) => {
    const normalizedRole = role === 'service_provider' ? 'vendor' : role?.trim().toLowerCase();
    const response = await addRoleRequest(normalizedRole, onboarding, token);
    const nextRoles = normalizeRoles(response.roles || response.user?.roles || []);
    const activeStorage = localStorage.getItem('kwick-token') ? localStorage : sessionStorage;
    const storedAuth = JSON.parse(activeStorage.getItem('kwick-auth') || '{}');
    const nextAuth = { ...storedAuth, user: response.user, roles: nextRoles, activeRole };
    setUser(response.user);
    setRoles(nextRoles);
    activeStorage.setItem('kwick-auth', JSON.stringify(nextAuth));
    return { ...response, roles: nextRoles };
  };

  const switchRole = useCallback((nextRole) => {
    if (!roles.includes(nextRole)) throw new Error('Role is not available for this account');
    setActiveRole(nextRole);
    localStorage.setItem('selected-role', nextRole);
    const activeStorage = localStorage.getItem('kwick-token') ? localStorage : sessionStorage;
    const storedAuth = JSON.parse(activeStorage.getItem('kwick-auth') || '{}');
    activeStorage.setItem('kwick-auth', JSON.stringify({ ...storedAuth, activeRole: nextRole }));
    return nextRole;
  }, [roles]);

  const value = { user, token, roles, activeRole, loading, setLoading, login, register, addRole, switchRole, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
