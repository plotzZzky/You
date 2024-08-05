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
      <div>
        <span onClick={goHome}>
          <FontAwesomeIcon icon={faHome} className='app-icon'/> Inicio
        </span>
      </div>

      <div style={{justifyContent: 'center'}}>
        <span onClick={showNewPostModal}>
          <FontAwesomeIcon icon={faSquarePlus} className='app-icon' /> Novo
        </span>

        <span onClick={props.followeePage}>
          <FontAwesomeIcon icon={faImage} className='app-icon' /> Amigos
        </span>

        <span onClick={props.allPostsPage}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='app-icon' /> Horizonte
        </span>

        <span onClick={e => props.profilePage(0)}>
          <FontAwesomeIcon icon={faUser} className='app-icon' /> Perfil
        </span>
      </div>

      <div style={{justifyContent: 'flex-end'}}>
        <span onClick={logOut}>
          <FontAwesomeIcon icon={faRightFromBracket} className='app-icon' /> Sair
        </span>
      </div>
    </nav>
  )
}