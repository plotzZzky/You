'use client'
import { useGenericGoLogout } from "./hooks/useLogout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faImage, faMagnifyingGlass, faSquarePlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import './navbar.css'


export default function AppBar(props) {
  const goLogout = useGenericGoLogout();

  return(
    <nav>
      <span onClick={props.showNewPostModal}>
        <FontAwesomeIcon icon={faSquarePlus}/> Novo
      </span>

      <span onClick={props.showFolloweePosts}>
        <FontAwesomeIcon icon={faImage}/> Amigos
      </span>

      <span onClick={props.showAllPosts}>
        <FontAwesomeIcon icon={faMagnifyingGlass}/> Horizonte
      </span>
      
      <span onClick={() => props.showProfilePage(0)}>
        <FontAwesomeIcon icon={faUser}/> Perfil
      </span>

      <span onClick={goLogout}>
        <FontAwesomeIcon icon={faRightFromBracket}/> Sair
      </span>
    </nav>
  )
}