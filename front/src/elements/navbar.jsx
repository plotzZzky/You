import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSmileWink, faUser, faBars, faImage } from '@fortawesome/free-solid-svg-icons'


import './navbar.css'

library.add(faSmileWink, faUser, faBars, faImage)


export default function NavBar() {
    const [getToken, setToken] = useState(sessionStorage.getItem('token'));

    function OpenMenu() {
        let navbar = document.getElementsByClassName("menu")[0];
        if (navbar.className == "menu") {
            navbar.classList.add("responsive")
        } else {
            navbar.className = "menu"
        }
      }

    function go_app() {
        if (getToken == undefined) {
            location.href = "/you/login/"
        } else {
            location.href = "/you/app/"
        }
    }

    return (
        <div className="navbar">

            <div className='navbar-align'>
                <div className="brand" onClick={() => location.href="/you/"}>
                    <i className="fa-solid fa-house"></i>
                    <a className="brand-name"> <FontAwesomeIcon icon="fa-solid fa-face-smile-wink" /> You! </a>
                </div>


                <div className="menu" id="menu">
                    <a className="menu-icon" onClick={OpenMenu}>
                    <FontAwesomeIcon icon="fa-solid fa-bars fa-2xl" />
                    </a>

                    <div className="menu-item" onClick={go_app}>
                        <a><FontAwesomeIcon icon="fa-solid fa-image" className='icon-menu'/> Ver </a>
                    </div>

                    <div className="menu-item" onClick={() => location.href="/you/login/"}>
                        <a><FontAwesomeIcon icon="fa-solid fa-user" className='icon-menu'/> Entrar </a>
                    </div>

                </div>
            </div>
        </div>
    )
}