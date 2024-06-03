import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGears} from '@fortawesome/free-solid-svg-icons'

export default function Profile(props) {
  const router = useRouter();
  const [getCards, setCards] = useState();

  function showEditUser() {
    // Mostra o modal para editar o perfil do usuario
    const newModal = document.getElementById("profileView")
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
    router.push(`/app/${userId}`);
  }

  const EDITICON = () => {
    return props.data?.me?
    <FontAwesomeIcon icon={faGears} className='app-icon' style={{cursor: 'pointer'}} onClick={showEditUser}/> : null
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
          {EDITICON()}
        </div>

        <span className="desc"> {props.data.profile.desc} </span>

        {getCards}
      </div>
    </div>
  )
}