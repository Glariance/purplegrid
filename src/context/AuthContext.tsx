import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  fetchCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  ApiError,
  User,
} from '../lib/api';
import { toast } from '../lib/toast';

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  registering: boolean;
  loggingIn: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    company?: string;
  }) => Promise<User>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'pg_token';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState<boolean>(!!localStorage.getItem(TOKEN_KEY));
  const [registering, setRegistering] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const me = await fetchCurrentUser(token);
        setUser(me);
      } catch (error) {
        console.error('Failed to hydrate user', error);
        setUser(null);
        setToken(null);
        localStorage.removeItem(TOKEN_KEY);
      } finally {
        setLoading(false);
      }
    };

    void hydrate();
  }, [token]);

  const persistToken = (value: string) => {
    setToken(value);
    localStorage.setItem(TOKEN_KEY, value);
  };

  const handleLogin = async (email: string, password: string) => {
    setLoggingIn(true);
    try {
      const response = await loginUser({ email, password });
      persistToken(response.token);
      setUser(response.user);
      return response.user;
    } finally {
      setLoggingIn(false);
    }
  };

  const handleRegister = async (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    company?: string;
  }) => {
    setRegistering(true);
    try {
      const response = await registerUser({ ...data, role_id: 1 });
      persistToken(response.token);
      setUser(response.user);
      return response.user;
    } finally {
      setRegistering(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await logoutUser(token);
      } catch (error) {
        console.warn('Logout request failed, clearing local state anyway', error);
      }
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    toast.fire({ icon: 'success', title: "You're logout successfully!" });
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      registering,
      loggingIn,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout,
    }),
    [user, token, loading, registering, loggingIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

export { ApiError };
