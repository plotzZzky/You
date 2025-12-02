'use client'
import { useApi } from "@hooks/useApi"
import { useGenericGoPage } from "@hooks/useGoPage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faImage, faMagnifyingGlass, faSquarePlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import './navbar.css'


export default function AppBar(props) {
  const goPage = useGenericGoPage()
  const requestApi = useApi();

  async function logoutAccount() {
    try {
      const response = await requestApi("LOGOUT");
      if (!response.ok) {
        throw "Não foi possivel deslogar";
      };

      goPage("HOME");

    } catch (error) {
      console.log(error);
    }
  };

  return(
    <nav id="AppBar">
      <span onClick={props.showNewPostModal}>
        <FontAwesomeIcon icon={faSquarePlus}/> Novo
      </span>

      <span onClick={props.showFolloweePosts}>
        <FontAwesomeIcon icon={faImage}/> Amigos
      </span>

      <span onClick={props.showAllPosts}>
        <FontAwesomeIcon icon={faMagnifyingGlass}/> Horizonte
      </span>
      
      <span onClick={props.showProfilePage}>
        <FontAwesomeIcon icon={faUser}/> Perfil
      </span>

      <span onClick={logoutAccount}>
        <FontAwesomeIcon icon={faRightFromBracket}/> Sair
      </span>
    </nav>
  )
}