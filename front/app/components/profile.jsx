import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGears} from '@fortawesome/free-solid-svg-icons'

export default function Profile(props) {

  function showEditUser() {
    // Mostra o modal para editar o perfil do usuario
    const newModal = document.getElementById("profileView")
    newModal.style.display = "flex"
  }

  return(
    <div className="profile">
      <img className="profile-img" src={props.data?.profile.image} alt="" />
      <div className="profile-desc">
        <div className="align-name">
          <span className="name"> {props.data.username} </span>
          {
            props.data?.me?
            <FontAwesomeIcon icon={faGears} className='app-icon' style={{cursor: 'pointer'}} onClick={showEditUser}/> : ''
          }
        </div>
        <span className="desc"> {props.data.profile.desc} </span>
      </div>
    </div>
  )
}