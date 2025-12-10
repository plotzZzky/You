import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import EditUserModal from './editUserModal';


export default function ProfileCard(props) {
  const [followersCards, setFollowersCards] = useState();
  const [showEditUserModal, setShowEditUserModal] = useState();

  const profileUsername = props.username[0].toUpperCase() + props.username.slice(1); // Deixa a primeria letra em maiusculo
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

  function showEditUserModalFunc() {
    setShowEditUserModal(showEditUserModal? false : true);
  }

  const FOLLOW_BTN = () => {
    const icon = false? faUserMinus : faUserPlus;

    return !props.itsMe?
      <FontAwesomeIcon icon={icon} onClick={followUser}/> : null
  };

  const EDIT_USER = () => {
    return props.itsMe?
      <FontAwesomeIcon icon={faEdit} onClick={showEditUserModalFunc}/> : null
  }

  return(
    <div className="profile">
      <img src={props.picture} alt={`Foto de ${profileUsername}`} />
      
      <div className="profile-data">

        <div className="align-name">
          <a> {profileUsername} </a>

          <div>
            {FOLLOW_BTN()}

            {EDIT_USER()}
            
          </div>
        </div>

        <span className="desc"> {profileDec} </span>

        {followersCards}

      </div>

      <EditUserModal showEditUserModal={showEditUserModal} showEditUserModalFunc={showEditUserModalFunc} />
    </div>
  )
}