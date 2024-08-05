import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faGears} from '@fortawesome/free-solid-svg-icons'

export default function Profile(props) {
  const [getCards, setCards] = useState();

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
    const value = props.data.profile.follows
    setCards(
      value.map((data, index) => (
        <div className='align-follow' key={index} onClick={() => goFolloweeProfile(data.id)}>
          <img className="follow-icon" src={data.profile.image} ></img>
        </div>
    )))
  }

  function goFolloweeProfile(userId) {
    props.showProfile(userId)
  }

  const USEREDITICON = () => {
    return props.data?.me?
      <FontAwesomeIcon className='app-icon' icon={faGears} style={{cursor: 'pointer'}} onClick={showEditUser}/> : null
  }

  const DESCEDITICON = () => {
    return props.data?.me?
      <FontAwesomeIcon className='app-icon' icon={faEdit} style={{cursor: 'pointer'}} onClick={showEditDesc}/> : null
  }

  useEffect(() => {
    createFolloweeCards()
  }, [])

  return(
    <div className="profile">
      <img className="profile-img" src={props.data?.profile.image} alt="" />
      
      <div className="profile-desc">
        <div className="align-name">
          <span className="name"> {props.data.username} </span>
          <div style={{display: 'flex', gap: '15px'}}>
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