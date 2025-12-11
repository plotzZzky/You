import { useState } from 'react'
import { useApi } from '@hooks/useApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import EditUserModal from './editUserModal';


export default function ProfileCard(props) {
  const fetchApi = useApi();

  const [showEditUserModal, setShowEditUserModal] = useState();

  const profileUsername = props.username[0].toUpperCase() + props.username.slice(1); // Deixa a primeria letra em maiusculo
  const profileDec =  props.desc || `${profileUsername} ainda não disse nada sobre si...`;

  async function followUser() {
    // Função para dar follow ou unfollow
    const url = `follow/${props.id}/`;
    fetchApi(url);
  };

  function showEditUserModalFunc() {
    setShowEditUserModal(showEditUserModal? false : true);
  }

  const EDIT_OR_FOLLOW_USER = () => {
    const icon = props.followed? faUserMinus : faUserPlus;

    return props.itsMe?
      <FontAwesomeIcon icon={faEdit} onClick={showEditUserModalFunc}/>
      : <FontAwesomeIcon icon={icon} onClick={followUser}/>
  }

  return(
    <div className="profile">
      <img id='profileImg' src={props.picture} alt={`Foto de ${profileUsername}`} />
      
      <div className="profile-data">

        <div className="align-name">
          <a> {profileUsername} </a>

          {EDIT_OR_FOLLOW_USER()}
        </div>

        <span className="desc"> {profileDec} </span>

      </div>

      <EditUserModal
        username={props.username}
        picture={props.picture}
        question={props.question}
        showEditUserModal={showEditUserModal}
        showEditUserModalFunc={showEditUserModalFunc}
      />
    </div>
  )
}