'use client'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faImage, faMagnifyingGlass, faSquarePlus, faGears, faRightFromBracket, faHome, faUsers } from '@fortawesome/free-solid-svg-icons'


export default function AppNavBar(props) {
  const router = useRouter();

  function goHome(){
    router.push('/')
  }

  function receiveFolloweePosts() {
    // Função que busca os posts do followees(pessoas que voce segue)
    const url = "http://127.0.0.1:8000/posts/followee/"
    props.recievePosts(url)
  }

  function receiveAllPosts() {
    // Função que busca os posts do followees(pessoas que voce segue)
    const url = "http://127.0.0.1:8000/posts/"
    props.recievePosts(url)
  }

  function showNewPostModal() {
    // Mostra o modal para criar um novo post
    const newModal = document.getElementById("NewPostModal")
    newModal.style.display = "flex"
  }

  function showEditUser() {
    // Mostra o modal para editar o perfil do usuario
    const newModal = document.getElementById("profileView")
    newModal.style.display = "flex"
  }

  function logOut() {
    sessionStorage.setItem("token", '')
    router.push('/');
  }

  return (
    <nav className="app-bar">

      <div className='align-app-bar'>
        <div className='app-icon-div' onClick={goHome}>
          <FontAwesomeIcon icon={faHome} className='app-icon' />
          <a className='app-name'> Inicio </a>
        </div>
      </div>

      <div className='align-app-bar' style={{justifyContent: 'center'}}>
        <div className='app-icon-div' onClick={showNewPostModal}>
          <FontAwesomeIcon icon={faSquarePlus} className='app-icon' />
          <a className='app-name'> Novo </a>
        </div>

        <div className='app-icon-div' onClick={receiveFolloweePosts}>
          <FontAwesomeIcon icon={faImage} className='app-icon' />
          <a className='app-name'> Amigos </a>
        </div>

        <div className='app-icon-div' onClick={receiveAllPosts}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='app-icon' />
          <a className='app-name'> Horizonte </a>
        </div>

        <div className='app-icon-div' onClick={() =>props.yourPosts()}>
          <FontAwesomeIcon icon={faUser} className='app-icon' />
          <a className='app-name'> Meus </a>
        </div>
      </div>

      <div className='align-app-bar' style={{justifyContent: 'flex-end'}}>
        <div className='app-icon-div' onClick={showEditUser}>
          <FontAwesomeIcon icon={faGears} className='app-icon' />
          <a className='app-name'> Ajustes </a>
        </div>

        <div className='app-icon-div' onClick={logOut}>
          <FontAwesomeIcon icon={faRightFromBracket} className='app-icon' />
          <a className='app-name'> Sair </a>
        </div>
      </div>
    </nav>
  )
}