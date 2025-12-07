import { useAuth } from './authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function CommentCard(props) {
  const [getToken, setToken] = useAuth();

  function deleteComment() {
    props.getAllComments();
  }

  function formatDate(value) {
  // Formata a data para ser exibida 
  if (value) {
    const date = value.split("-");
    return `${date[2]}/${date[1]}/${date[0]}`;
  }
}

  const DELETEBTN = () => {
    return props.data?.your ?
    <a className="post-delete" onClick={deleteComment}> <FontAwesomeIcon icon={faTrash} /></a> : null
  }

  return (
    <div className='comment-card'>
      <a className="comment-username"> {props.data?.username} </a>

      <div className='comment'>
         {props.data?.text}
      </div>

      <div className="post-align-btns">
        <a className="date"> {formatDate(props.data?.date)} </a>
        {DELETEBTN()}
      </div>

    </div>
  )
}