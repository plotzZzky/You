'use client'
import { useApi } from "./useApi";
import { useAuth } from "../authContext";
import { useGenericGoPage} from '@hooks/useGoPage'


export function useGenericGoLogout() {
  const requestApi = useApi();
  const goPage = useGenericGoPage();
  const { checkAuthStatus } = useAuth();

  const logoutAccount = async () => {
    try {
      const response = await requestApi("auth/login/");

      if (!response.ok) {
        throw "Não foi possivel deslogar";

      } else {
        checkAuthStatus();
        goPage("HOME");
      }

    } catch (error) {
      console.log(error);
    }
  };

  return logoutAccount;
}