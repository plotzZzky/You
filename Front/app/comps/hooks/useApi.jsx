'use client'
import { useCallback } from 'react';


export const useApi = () => {
  const customFetch = useCallback(async (endpoint, returnJson, options = {}) => {
    let url = ""
    
    const pages = {
      BASE: process.env.NEXT_PUBLIC_BASE_URL,
      POSTS: process.env.NEXT_PUBLIC_POSTS_URL,
      FOLLOW: process.env.NEXT_PUBLIC_FOLLOW_URL,
      USERS: process.env.NEXT_PUBLIC_USERS_URL,

      LOGIN: process.env.NEXT_PUBLIC_LOGIN_URL,
      REGISTER: process.env.NEXT_PUBLIC_REGISTER_URL,
      RECOVERY: process.env.NEXT_PUBLIC_RECOVERY_URL,
      SET_PWD: process.env.NEXT_PUBLIC_SET_PWD_URL,
      ME: process.env.NEXT_PUBLIC_ME_URL,
      LOGOUT: process.env.NEXT_PUBLIC_LOGOUT_URL,
    }

    if (typeof endpoint === 'string' && pages[endpoint]) {
      url = `${pages["BASE"]}${pages[endpoint]}`;
      
    } else {
      url = `${pages["BASE"]}${pages["CARDS"]}${endpoint}/`; // o endpoint deve ser um id ex "backend/pets/{id}/"
    }

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