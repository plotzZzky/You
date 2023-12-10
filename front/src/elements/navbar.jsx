import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBars, faImage, faHome } from '@fortawesome/free-solid-svg-icons'
import './navbar.css'


export default function NavBar() {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));

  // Função que abre o menu no modo responsivo
  function open_responsive_menu() {
    let navbar = document.getElementsByClassName("menu")[0];
    if (navbar.className == "menu") {
      navbar.classList.add("responsive")
    } else {
      navbar.className = "menu"
    }
  }

    // Função que fecha o menu no modo responsivo
  function close_responsive_menu() {
    let navbar = document.getElementsByClassName("menu")[0];
    navbar.classList.remove("responsive")
  }

  // Function to go
  function go_home() {
    if (location.pathname != '/') {
    location.href = "/"
    }
    close_responsive_menu()
  }

  function go_app() {
    if (getToken == undefined) {
      location.pathname = "/login/"
    } else {
      if (location.pathname != '/app/') {
      location.pathname = "/app/"
      }
    }
    close_responsive_menu()
  }

  function go_login(){
    if (getToken == undefined) {
      location.pathname = "/login/"
    } else {
      location.pathname = "/app/"
    }
    close_responsive_menu()
  }

  return (
    <div className="navbar">

      <div className='navbar-align'>
        <div className="menu" id="menu">
          <a className="menu-icon" onClick={open_responsive_menu}>
            <FontAwesomeIcon icon={faBars} />
          </a>

          <div className="menu-item" onClick={go_home}>
            <a><FontAwesomeIcon icon={faHome} className='icon-menu' /> Inicio </a>
          </div>

          <div className="menu-item" onClick={go_app}>
            <a><FontAwesomeIcon icon={faImage} className='icon-menu' /> Ver </a>
          </div>

          <div className="menu-item" onClick={go_login}>
            <a><FontAwesomeIcon icon={faUser} className='icon-menu' /> Entrar </a>
          </div>

        </div>
      </div>
    </div>
  )
}