import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faGears} from '@fortawesome/free-solid-svg-icons'

export default function ProfileCard(props) {
  const profileImage = props.data?.image;
  const itsMe = props.data.me;

  const [getCards, setCards] = useState();

  useEffect(() => {
    createFolloweeCards();
  }, [])

  function showEditUser() {
    // Mostra o modal para editar o perfil do usuario
    const newModal = document.getElementById("editUser")
    newModal.style.display = "flex"
  }

  function showEditDesc() {
    // Mostra o modal para editar o perfil do usuario
    const newModal = document.getElementById("editDesc")
    newModal.style.display = "flex"
  }

  function createFolloweeCards() {
    // Cria os cards dos cards dos followees
    const value = props.data.followers;

    if (value) {
      setCards(
        value.map((data, index) => (
          <div className='align-follow' key={index} onClick={() => goFolloweeProfile(data.id)}>
            <img className="follow-icon" src={data.profile.image} ></img>
          </div>
      )))
    }
  }

  function goFolloweeProfile(userId) {
    props.showProfile(userId)
  }

  const USEREDITICON = () => {
    return itsMe?
      <FontAwesomeIcon icon={faGears} onClick={showEditUser}/> : null
  }

  const DESCEDITICON = () => {
    return itsMe?
      <FontAwesomeIcon icon={faEdit} onClick={showEditDesc}/> : null
  }

  return(
    <div className="profile">
      <img className="profile-img" src={profileImage} alt="" />
      
      <div className="profile-desc">
        <div className="align-name">
          <span className="name"> {props.data.username} </span>
          <div>
            {DESCEDITICON()}
            
            {USEREDITICON()}
          </div>
        </div>

        <span className="desc"> {props.data.profile.desc} </span>

        {getCards}
      </div>
    </div>
  )
}