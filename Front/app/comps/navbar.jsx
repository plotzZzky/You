'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from './authContext'
import { useApi } from './hooks/useApi'
import { useGenericGoPage} from '@hooks/useGoPage'
import { useGoLoginPage } from '@hooks/useGoLogin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from 'react-tooltip'
import { faUser, faHome, faQuestion, faUsers, faRightFromBracket, faImage } from '@fortawesome/free-solid-svg-icons'
import './navbar.css'


export default function NavBar() {
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const requestApi = useApi();
  const goLoginPage = useGoLoginPage();
  const goPage = useGenericGoPage();

  useEffect(() => {
    // Se executado indica estar no cliente
    setIsClient(true) // Usado para evitar erros de api do navegador não disponivel
  }, [])

  // * * * Funções de navegação pelas paginas * * *
  function goHomePage() {
    if (pathname !== '/') {
      goPage("HOME");
    };

    document.getElementById('Start').scrollIntoView();
  };

  function goAboutPage() {
    document.getElementById('About').scrollIntoView();
  };

  function goFaqPage() {
    document.getElementById('Faq').scrollIntoView();
  };

  function cardPagePage() {
    goPage("CARDS");
  };

  async function logoutAccount() {
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

  const ABOUT_LINK = () => {
    if (isClient) {
      return pathname === '/' ? (
        <span onClick={goAboutPage}>
          <FontAwesomeIcon icon={faUsers} /> Sobre
        </span>
      ) : null
    }
  };

  const FAQ_LINK = () => {
    if (isClient) {
      return pathname === '/' ? (
        <span onClick={goFaqPage}>
          <FontAwesomeIcon icon={faQuestion} /> Dúvidas
        </span>
      ) : null
    }
  };

  const APP_LINK = () => {
    return isAuthenticated? (
      <span onClick={cardPagePage}>
        <FontAwesomeIcon icon={faImage}/> Ver
      </span>
    ) : 
      null
  };

  const LOGIN_LINK = () => {
    return !isAuthenticated? (
      <span onClick={goLoginPage}>
        <FontAwesomeIcon icon={faUser} /> Entrar
      </span>
    ) : ( 
      <span onClick={logoutAccount}>
        <FontAwesomeIcon icon={faRightFromBracket}/> Sair
      </span>     
    )
  };

  return (
    <nav>
      <span onClick={goHomePage}>
        <FontAwesomeIcon icon={faHome}/> Inicio 
      </span>

      {ABOUT_LINK()}

      {FAQ_LINK()}

      {APP_LINK()}

      {LOGIN_LINK()}

      <Tooltip id="toolTip"/>
    </nav>
  )
}