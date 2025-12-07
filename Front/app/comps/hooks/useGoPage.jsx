'use client'
import { useRouter } from "next/navigation";


export function useGenericGoPage() {
  const router = useRouter();
  const pages = {
    HOME: process.env.NEXT_PUBLIC_HOME_PAGE,
    CARDS: process.env.NEXT_PUBLIC_CARDS_PAGE,
    AUTH: process.env.NEXT_PUBLIC_AUTH_PAGE,
    RECOVERY: process.env.NEXT_PUBLIC_RECOVERY_PAGE,
  }

  const go = async (url) => {
    try {
      const newUrl = pages[url];
      router.push(newUrl);

      if (!newUrl) {
        throw `Url ${url} não encontrada!`;
      };

    } catch (error) {
      console.log(error);
    }
  };

  return go;
}