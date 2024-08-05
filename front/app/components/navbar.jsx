'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from './authContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBars, faImage, faHome, faQuestion, faUsers } from '@fortawesome/free-solid-svg-icons'
import './navbar.css'


export default function NavBar() {
  const [getToken, setToken] = useAuth();
  const router = useRouter();
  const getPath = usePathname();

  function openResponsiveMenu() {
    // Função que abre o menu no modo responsivo
    const navbar = document.getElementById('menu');
    if (navbar.className == "menu") {
      navbar.classList.add("responsive");
    } else {
      navbar.className = "menu";
    }
  };

  function closeResponsiveMenu() {
    // Função que fecha o menu no modo responsivo
    const navbar = document.getElementById("menu");
    navbar.classList.remove("responsive");
  };

  // Criam os item na navbar dependendo da pagina acessada
  const ABOUT = () => {
    return getPath === '/' ? (
      <span onClick={goAbout}>
        <FontAwesomeIcon icon={faUsers}/> Sobre
      </span>
    ) : null
  };

  const FAQ = () => {
    return getPath === '/' ? (
      <span onClick={goFaq}>
      <FontAwesomeIcon icon={faQuestion}/> Dúvidas
      </span>
    ) : null
  };

  const LOGIN = () => {
    return !getToken? (
      <span onClick={goApp}>
        <FontAwesomeIcon icon={faUser}/> Entrar
      </span>
    ) : (
      <span onClick={goApp}>
        <FontAwesomeIcon icon={faImage}/> App
      </span>
    )
  };

  //Funções de navegação pelas paginas
  function goHome() {
    if (getPath === '/') {
      document.getElementById('Start').scrollIntoView();
    } else {
      router.push('/');
    }
    closeResponsiveMenu();
  };

  function goAbout() {
    document.getElementById('About').scrollIntoView();
    closeResponsiveMenu();
  }

  function goFaq() {
    document.getElementById('Faq').scrollIntoView();
    closeResponsiveMenu();
  }

  function goApp() {
    // Se possui token redireciona para pagina do app, se não, para pagina do login
    if (!getToken) {
      router.push("/login/")
    } else {
      router.push("/app/")
    }
    closeResponsiveMenu()
  }

  return (
    <nav>
      <div className="menu" id="menu">

        <span id='menuBtn' onClick={openResponsiveMenu}>
          <FontAwesomeIcon icon={faBars} />
        </span>

        <span onClick={goHome}>
          <FontAwesomeIcon icon={faHome}/> Inicio
        </span>

        {ABOUT()}

        {FAQ()}

        {LOGIN()}

      </div>
    </nav>
  )
}