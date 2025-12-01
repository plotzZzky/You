'use client';
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useApi } from '@hooks/useApi';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const requestApi = useApi();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenLifetime, setTokenLifetime] = useState(null);
  const currentTime = Date.now();

  const checkAuthStatus = useCallback(async () => {

    if (currentTime < tokenLifetime) {
      return;  // Se o tempo não expirou encerra a verificação
    }

    try {
      // Verifica se está logado, se sim, retorna 200
      const response = await requestApi('ME'); 
      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setTokenLifetime(data);
      };

    } catch (error) {
      setIsAuthenticated(false);
    }

  }, [requestApi]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]); 

  const value = useMemo(() => ({
    isAuthenticated,
    checkAuthStatus,
    tokenLifetime,
    setTokenLifetime,
  }), [isAuthenticated, checkAuthStatus, tokenLifetime, setTokenLifetime]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};

// Hook para acessar os useStates
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};