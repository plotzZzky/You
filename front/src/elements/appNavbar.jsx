import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faImage, faMagnifyingGlass, faSquarePlus, faGears } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faImage, faMagnifyingGlass, faSquarePlus, faGears)


export default function AppNavBar(props) {

  function show_profile() {
    hide_all()
    let profile = document.getElementById("profileView")
    profile.style.display = 'block'
    check_tab(" Ajustes ")
  }

  function show_your_posts() {
    hide_all()
    props.your()
    let profile = document.getElementById("yourView")
    profile.style.display = 'block'
    check_tab(" Meus ")
  }

  function show_follow_posts() {
    hide_all()
    props.friends()
    let posts = document.getElementById("postsView")
    posts.style.display = 'block'
    check_tab(" Amigos ")
  }

  function show_horizon() {
    hide_all()
    props.all()
    let posts = document.getElementById("horizonView")
    posts.style.display = 'block'
    check_tab(" Horizonte ")
  }

  function hide_all() {
    let tabs = document.getElementsByClassName('app-page')
    for (let x = 0; x < tabs.length; x++) {
      tabs[x].style.display = 'none'
    }
  }

  function check_tab(value) {
    const tabs = document.getElementsByClassName("app-navbar-icon-div")
    console.log('---------------------------')
    for (let x = 0; x < tabs.length; x++) {
      let tab = tabs[x].children[1].innerHTML
      if (tab == value) {
        tabs[x].classList.add('nav-active')
      } else {
        console.log(tab)
        tabs[x].classList.remove('nav-active')
      }
    }
  }

  useEffect(() => {
    check_tab(" Amigos ")
  }, [])

  return (
    <nav className="app-navbar">
      <div className='app-navbar-icon-div' onClick={show_follow_posts}>
        <FontAwesomeIcon icon="fa-solid fa-image" className='app-icon' />
        <a> Amigos </a>
      </div>

      <div className='app-navbar-icon-div' onClick={show_horizon}>
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className='app-icon' />
        <a> Horizonte </a>
      </div>

      <div className='app-navbar-icon-div' onClick={props.new}>
        <FontAwesomeIcon icon="fa-solid fa-square-plus" className='app-icon' />
        <a> Novo </a>
      </div>

      <div className='app-navbar-icon-div' onClick={show_your_posts}>
        <FontAwesomeIcon icon="fa-solid fa-user" className='app-icon' />
        <a> Meus </a>
      </div>

      <div className='app-navbar-icon-div' onClick={show_profile}>
        <FontAwesomeIcon icon="fa-solid fa-gears" className='app-icon' />
        <a> Ajustes </a>
      </div>
    </nav>
  )
}