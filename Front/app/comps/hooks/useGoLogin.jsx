'use client'
import { useAuth } from '../authContext';
import { useGenericGoPage } from './useGoPage';


export function useGoLoginPage() {
  const { isAuthenticated } = useAuth();
  const goPage = useGenericGoPage();

  const go = () => {
    const url = isAuthenticated ? "CARDS" : "AUTH";

    goPage(url);
  };

  return go;
}
