import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faImage, faMagnifyingGlass, faSquarePlus, faGears, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'


export default function AppNavBar(props) {
  const router = useRouter();

  // essa função atualiza a timeline com a categoria selecionada
  function setContentFromTimeline(value) {
    props.get_posts(value)
  }
  
  function showFriendsPosts() {
    setContentFromTimeline('Friends')
  }

  function showHorizonPosts() {
    setContentFromTimeline('All')
  }

  function showYourPosts() {
    setContentFromTimeline('You')
  }

  // Mostra o modal para criar um novo post
  function showNewPostModal() {
    const newModal = document.getElementById("NewPostModal")
    newModal.style.display = "flex"
  }

  // Mostra o modal para editar o perfil do usuario
  function showEditUser() {
    const newModal = document.getElementById("profileView")
    newModal.style.display = "flex"
  }

  function logOut() {
    sessionStorage.setItem("token", '')
    router.push('/');
  }

  return (
    <nav className="app-navbar">

      <div className='app-navbar-icon-div' onClick={showNewPostModal}>
        <FontAwesomeIcon icon={faSquarePlus} className='app-icon' />
        <a className='app-name'> Novo </a>
      </div>

      <div className='app-navbar-icon-div' onClick={showFriendsPosts}>
        <FontAwesomeIcon icon={faImage} className='app-icon' />
        <a className='app-name'> Amigos </a>
      </div>

      <div className='app-navbar-icon-div' onClick={showHorizonPosts}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='app-icon' />
        <a className='app-name'> Horizonte </a>
      </div>

      <div className='app-navbar-icon-div' onClick={showYourPosts}>
        <FontAwesomeIcon icon={faUser} className='app-icon' />
        <a className='app-name'> Meus </a>
      </div>

      <div className='app-navbar-icon-div' onClick={showEditUser}>
        <FontAwesomeIcon icon={faGears} className='app-icon' />
        <a className='app-name'> Ajustes </a>
      </div>

      <div className='app-navbar-icon-div' onClick={logOut}>
        <FontAwesomeIcon icon={faRightFromBracket} className='app-icon' />
        <a className='app-name'> Sair </a>
      </div>
    </nav>
  )
}