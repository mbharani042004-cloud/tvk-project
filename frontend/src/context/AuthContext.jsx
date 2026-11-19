import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  register as registerUser,
  login as loginUser,
  setSession,
  logout as clearSession,
  getCurrentUser,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());

  const signIn = useCallback(({ identifier, password, remember }) => {
    const result = loginUser({ identifier, password });
    if (result.ok) {
      setSession(result.user, Boolean(remember));
      setUser(result.user);
    }
    return result;
  }, []);

  const signUp = useCallback((payload) => {
    const result = registerUser(payload);
    if (result.ok) {
      setSession(result.user, false);
      setUser(result.user);
    }
    return result;
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signIn,
      signUp,
      signOut,
    }),
    [user, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
}
