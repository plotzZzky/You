import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faImage, faMagnifyingGlass, faSquarePlus, faGears } from '@fortawesome/free-solid-svg-icons'


export default function AppNavBar(props) {
  // essa função atualiza a timeline com a categoria selecionada
  function set_content_from_timeline(value) {
    props.get_posts(value)
  }
  
  function show_friends_posts() {
    set_content_from_timeline('Friends')
  }

  function show_horizon_posts() {
    set_content_from_timeline('All')
  }

  function show_your_posts() {
    set_content_from_timeline('You')
  }

  // Mostra o modal para criar um novo post
  function show_new_post_modal() {
    const newModal = document.getElementById("NewPostModal")
    newModal.style.display = "flex"
  }

  // Mostra o modal para editar o perfil do usuario
  function show_edit_user() {
    const newModal = document.getElementById("profileView")
    newModal.style.display = "flex"
  }

  return (
    <nav className="app-navbar">
      <div className='app-navbar-icon-div' onClick={show_friends_posts}>
        <FontAwesomeIcon icon={faImage} className='app-icon' />
        <a className='app-name'> Amigos </a>
      </div>

      <div className='app-navbar-icon-div' onClick={show_horizon_posts}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='app-icon' />
        <a className='app-name'> Horizonte </a>
      </div>

      <div className='app-navbar-icon-div' onClick={show_new_post_modal}>
        <FontAwesomeIcon icon={faSquarePlus} className='app-icon' />
        <a className='app-name'> Novo </a>
      </div>

      <div className='app-navbar-icon-div' onClick={show_your_posts}>
        <FontAwesomeIcon icon={faUser} className='app-icon' />
        <a className='app-name'> Meus </a>
      </div>

      <div className='app-navbar-icon-div' onClick={show_edit_user}>
        <FontAwesomeIcon icon={faGears} className='app-icon' />
        <a className='app-name'> Ajustes </a>
      </div>
    </nav>
  )
}