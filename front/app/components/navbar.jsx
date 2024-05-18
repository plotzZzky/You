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
    const navbar = document.getElementsByClassName("menu")[0];
    if (navbar.className == "menu") {
      navbar.classList.add("responsive");
    } else {
      navbar.className = "menu";
    }
  };

  function closeResponsiveMenu() {
    // Função que fecha o menu no modo responsivo
    const navbar = document.getElementsByClassName("menu")[0];
    navbar.classList.remove("responsive");
  };

  // Criam os item na navbar dependendo da pagina acessada
  const ABOUT = () => {
    return getPath === '/' ? (
      <div className="menu-item" onClick={goAbout}>
        <a><FontAwesomeIcon icon={faUsers} className='icon-menu' /> Sobre </a>
      </div>
    ) : null
  };

  const FAQ = () => {
    return getPath === '/' ? (
      <div className="menu-item" onClick={goFaq}>
        <a><FontAwesomeIcon icon={faQuestion} className='icon-menu' /> Dúvidas </a>
      </div>
    ) : null
  };

  const LOGIN = () => {
    return getToken === ''? (
      <div className="menu-item" onClick={goApp}>
        <a><FontAwesomeIcon icon={faUser} className='icon-menu' /> Entrar </a>
      </div>
    ) : (
      <div className="menu-item" onClick={goApp}>
        <a><FontAwesomeIcon icon={faImage} className='icon-menu' /> App </a>
      </div>
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
    if (getToken === '') {
      router.push("/login/")
    } else {
      router.push("/app/")
    }
    closeResponsiveMenu()
  }

  return (
    <nav>
      <div className='navbar-align'>
        <div className="menu" id="menu">

          <a className="menu-icon" onClick={openResponsiveMenu}>
            <FontAwesomeIcon icon={faBars} />
          </a>

          <div className="menu-item" onClick={goHome}>
            <a><FontAwesomeIcon icon={faHome} className='icon-menu' /> Inicio </a>
          </div>

          {ABOUT()}

          {FAQ()}

          {LOGIN()}

        </div>
      </div>
    </nav>
  )
}