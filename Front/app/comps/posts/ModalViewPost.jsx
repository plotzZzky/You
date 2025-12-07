import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faThumbsUp, faComment, faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUp_r } from '@fortawesome/free-regular-svg-icons'
import CommentsPage from './commentsPage'


export default function ViewPostModal(props) {
  const fetchApi = useApi();
  const [showComments, setShowComments] = useState(false);

  const postId = props.modalData?.id || null;
  const postImg = props.modalData?.image || null;
  const postMine = props.modalData?.user?.me || null;
  const postFollowing = props.modalData?.following || null;

  const postText = props.modalData?.text;
  const postDate = props.modalData?.date;

  const liked = props.modalData?.liked || null;
  const likes = props.modalData?.likes?.length || 0;
  const comments = props.modalData?.comments?.length  || 0;

  const username = props.modalData?.user?.username || null;
  const userID = props.modalData?.user?.id || null; 
  const userPicture = props.modalData?.user?.picture || null;

  function closeThisModal() {
    props.setShowViewPost(false);
  };
  
  function showCommentPage() {
    setShowComments(showComments? false : true);
  };

  function goToProfile() {
    // Exibe o perfil e posts do usuario atual
    closeThisModal();
  };

  async function deleteThisPost() {
    // Deleta esse post
    const url = `posts/${postId}/`

    const requestData = {
      method: "DELETE",
    };

    const response = await fetchApi(url, false, requestData);

    if (response.ok) {
      props.update();
      closeThisModal();
    }
  };

  async function changeLike() {
    // Função para dar like ou dislike
    const url = `like/${postId}/` 
    const response = await fetchApi(url);

    if (response.ok) {

    }
  };

  async function followUser() {
    // Função para dar follow ou unfollow
    const url = `follow/${userID}/` 
    const response = await fetchApi(url);

    if (response.ok) {

    }
  };

  // * * * Btns * * *
  const FOLLOW_BTN = () => {
    const icon = postFollowing? faUserMinus : faUserPlus;

    return !postMine?
      <button className='modal-btn' onClick={followUser}>
          <FontAwesomeIcon icon={icon}/>
      </button>
    : null
  };

  const LIKE_BTN = () => {
    const icon = liked? faThumbsUp : faThumbsUp_r;

    return !postMine? (
      <button onClick={changeLike}>
        <FontAwesomeIcon icon={icon}/>
        <a>{likes}</a>
      </button>
    ) : null
  };

  const COMMENT_BTN = () => {
    return (
      <button onClick={showCommentPage}>
        <FontAwesomeIcon icon={faComment} />
        <a> {comments} </a>
      </button>
    )
  };

  const DELETE_BTN = () => {
    return postMine?
      <button onClick={deleteThisPost}> <FontAwesomeIcon icon={faTrash} /></button> : null
  };

  const CONTENT_PAGE = () => {
    return showComments? (
        <CommentsPage text={postText} date={postDate} />
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
              <a className="username"> {username} </a>
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