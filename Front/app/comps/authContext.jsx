'use client';
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useApi } from '@hooks/useApi';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const requestApi = useApi();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = useCallback(async () => {

    try {
      // Verifica se está logado, se sim, retorna 200
      const response = await requestApi('ME'); 

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

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
  }), [isAuthenticated, checkAuthStatus]);

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