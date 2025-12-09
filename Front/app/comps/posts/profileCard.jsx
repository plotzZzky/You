import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faGears, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons'


export default function ProfileCard(props) {
  const [followersCards, setFollowersCards] = useState();
  const profileUsername = props.username[0].toUpperCase() + props.username.slice(1);
  const profileDec =  props.desc || `${profileUsername} ainda não disse nada sobre si...`;

  useEffect(() => {
    createFolloweeCards();
  }, [])

  function createFolloweeCards() {
    // Cria os cards dos cards dos followees
    const value = props.followers;

    if (value) {
      setFollowersCards(
        value.map(({picture, id}, index) => (
          <div className='follower' key={index} onClick={() => goFolloweeProfile(id)}>
            <img src={picture} />
          </div>
      )))
    }
  };

  function showEditUsernameModal() {
    // Mostra o modal para editar o perfil do usuario
  }

  function showEditDescModal() {
    // Mostra o modal para editar o perfil do usuario
  }

  function goFolloweeProfile(userId) {
    props.showProfile(userId);
  };

  async function followUser() {
    // Função para dar follow ou unfollow
    const url = `follow/${userID}/`;
    const response = await fetchApi(url);

    if (response.ok) {
      props.receiveViewPostModalData(postId);
    }
  };

  const FOLLOW_BTN = () => {
    const icon = false? faUserMinus : faUserPlus;

    return !props.itsMe?
      <FontAwesomeIcon icon={icon} onClick={followUser}/> : null
  };

  const USEREDITICON = () => {
    return props.itsMe?
      <FontAwesomeIcon icon={faGears} onClick={showEditUsernameModal}/> : null
  }

  const DESCEDITICON = () => {
    return props.itsMe?
      <FontAwesomeIcon icon={faEdit} onClick={showEditDescModal}/> : null
  }

  return(
    <div className="profile">
      <img src={props.picture} alt={`Foto de ${profileUsername}`} />
      
      <div className="profile-data">

        <div className="align-name">
          <a> {profileUsername} </a>

          <div>
            {FOLLOW_BTN()}

            {DESCEDITICON()}
            
            {USEREDITICON()}
          </div>
        </div>

        <span className="desc"> {profileDec} </span>

        {followersCards}

      </div>
    </div>
  )
}