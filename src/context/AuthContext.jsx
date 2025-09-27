import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { authApi } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [currentClass, setCurrentClass] = useState(() => localStorage.getItem('currentClass'));

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (currentClass) localStorage.setItem('currentClass', currentClass);
    else localStorage.removeItem('currentClass');
  }, [currentClass]);

  const login = useCallback(async (email, password, classCode = null) => {
    const { data } = await authApi.login(email, password, classCode);
    setUser(data.user);
    setToken(data.token);
    setCurrentClass(data.user.currentClass || null);
    return data;
  }, []);

  const register = useCallback(async (payload) => {
    await authApi.register(payload);
    // After register, user should login
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setCurrentClass(null);
  }, []);

  const switchClass = useCallback(async (classCode) => {
    const { data } = await authApi.post('/classes/switch', { classCode });
    setToken(data.token);
    setCurrentClass(data.currentClass);
    return data;
  }, []);

  const value = useMemo(() => ({ 
    user, 
    token, 
    currentClass, 
    login, 
    logout, 
    register, 
    switchClass 
  }), [user, token, currentClass]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}



