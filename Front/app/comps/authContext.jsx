'use client';
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useApi } from '@hooks/useApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const requestApi = useApi();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = useCallback(async () => {
    try {
      setLoading(true);
      const response = await requestApi('me/');

      if (response.ok) {
        setIsAuthenticated(true);  // Se a resposta for ok, o usuário está autenticado

      } else {
        setIsAuthenticated(false);  // Se não, não está autenticado
      }

    } catch (error) {
      setIsAuthenticated(false);
      
    } finally {
      setLoading(false);
    }
  }, [requestApi]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]); 

  const value = useMemo(() => ({
    isAuthenticated,
    setIsAuthenticated,
    checkAuthStatus,
    loading,
  }), [isAuthenticated, checkAuthStatus]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar os useStates
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
