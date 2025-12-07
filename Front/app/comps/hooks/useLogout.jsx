'use client'
import { useApi } from "./useApi";
import { useGenericGoPage} from '@hooks/useGoPage'


export function useGenericGoLogout() {
  const requestApi = useApi();
  const goPage = useGenericGoPage();

  const logoutAccount = async () => {
    try {
      const response = await requestApi("LOGOUT");

      if (!response.ok) {
        throw "Não foi possivel deslogar";
      };

      goPage("HOME");

    } catch (error) {
      console.log(error);
    }
  };

  return logoutAccount;
}