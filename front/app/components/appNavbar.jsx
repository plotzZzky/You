'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from './authContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faImage, faMagnifyingGlass, faSquarePlus, faRightFromBracket, faHome } from '@fortawesome/free-solid-svg-icons'


export default function AppNavBar(props) {
  const router = useRouter();
  const [Token, updateToken] = useAuth();

  function goHome(){
    router.push('/')
  }

  function showNewPostModal() {
    // Mostra o modal para criar um novo post
    const newModal = document.getElementById("NewPostModal")
    newModal.style.display = "flex"
  }

  function logOut() {
    updateToken(null);
    router.push('/login');
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

        <div className='app-icon-div' onClick={props.followeePage}>
          <FontAwesomeIcon icon={faImage} className='app-icon' />
          <a className='app-name'> Amigos </a>
        </div>

        <div className='app-icon-div' onClick={props.allPostsPage}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='app-icon' />
          <a className='app-name'> Horizonte </a>
        </div>

        <div className='app-icon-div' onClick={e => props.profilePage(0)}>
          <FontAwesomeIcon icon={faUser} className='app-icon' />
          <a className='app-name'> Perfil </a>
        </div>
      </div>

      <div className='align-app-bar' style={{justifyContent: 'flex-end'}}>
        <div className='app-icon-div' onClick={logOut}>
          <FontAwesomeIcon icon={faRightFromBracket} className='app-icon' />
          <a className='app-name'> Sair </a>
        </div>
      </div>
    </nav>
  )
}