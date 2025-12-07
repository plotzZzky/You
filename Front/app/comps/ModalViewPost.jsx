import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './authContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faThumbsUp, faComment, faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUp_r } from '@fortawesome/free-regular-svg-icons'
import CommentsPage from './commentsPage'


export default function ViewPostModal(props) {
  const router = useRouter();
  const { IsAuthenticated } = useAuth();
  const [showComments, setShowComments] = useState(false);

  const [getCards, setCards] = useState([])
  const [getComment, setComment] = useState("");

  const postImg = props.modalData?.image || null;
  const postMine = props.modalData?.me || null;
  const postFollowing = props.modalData?.following || null;

  const liked = props.data?.liked || null;
  const likes = props.modalData?.likes?.length || 0;
  const comments = props.modalData?.comments?.length  || 0;

  const username = props.modalData?.user?.username || null;
  const userPicture = props.modalData?.user?.image || null;

  function closeThisModal() {
    props.setShowViewPost(false);
  }

  function goToProfile() {
    // redireciona para o perfil de um outro usuario
    const userId = props.modalData?.user.id;
    props.showProfile(userId);
    closeThisModal();
  };

  function deletePost() {
    // Deleta esse post
  };

  function changeLike() {
    // Função para dar like ou dislike
  };

  function followUser() {
    // Função para dar follow ou unfollow
  };

  // Btns
  const FOLLOW_BTN = () => {
    return !postMine?
      <button className='modal-btn' onClick={followUser}>
        {postFollowing?
          <FontAwesomeIcon icon={faUserMinus}/> : <FontAwesomeIcon icon={faUserPlus}/>
        }
      </button>
    : null
  };

  const LIKE_BTN = () => {
    return (
      <button onClick={changeLike}>
        {liked? <FontAwesomeIcon icon={faThumbsUp}/> : <FontAwesomeIcon icon={faThumbsUp_r}/>}
        <a>{likes}</a>
      </button>
    )
  };

  const COMMENT_BTN = () => {
    return (
      <button onClick={() => showComments(true)}> <FontAwesomeIcon icon={faComment} />
        <a> {comments} </a>
      </button>
    )
  };

  const DELETE_BTN = () => {
    return postMine?
      <button onClick={deletePost}> <FontAwesomeIcon icon={faTrash} /></button> : null
  };

  const CONTENT_PAGE = () => {
    return showComments? (
        <CommentsPage />
      ) : (
        <img src={postImg} />
    )
  };

  if (props.showViewPost) {
    return (
      <div id="ViewPostModal" onClick={closeThisModal}>
        <div className='modal' onClick={e => e.stopPropagation()}>

          {CONTENT_PAGE()}

          <div className='modal-data'>
            
            <div className='align-nick' onClick={goToProfile}>
              <img className="user-pic" src={userPicture} />
              <a className="username"> {username} "sjsjjsjsj" </a>
            </div>

            <div className="btns">
              {FOLLOW_BTN()}
              {LIKE_BTN()}
              {COMMENT_BTN()}
              {DELETE_BTN()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}