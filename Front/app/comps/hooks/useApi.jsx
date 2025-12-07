'use client'
import { useCallback } from 'react';


export const useApi = () => {
  const customFetch = useCallback(async (endpoint, returnJson = false, options = {}) => {
    const URL_BASE = process.env.NEXT_PUBLIC_BASE_URL;
    const url = `${URL_BASE}${endpoint}`;

    const defaultOptions = {
      method: "GET",
      credentials: 'include',
    };

    const finalOptions = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, finalOptions);
 
      if (returnJson) {
        const data = await response.json();
        return data;
      };

      return response;

    } catch (error) {
      console.log(error)
    }
  }, []);

  return customFetch;
};