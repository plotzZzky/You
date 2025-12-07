import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function CommentCard(props) {
  const username = props.data?.username;
  const text = props.data?.text;
  const date = props.data?.date;

  function deleteThisComment() {
    props.getAllComments();
  }

  const DELETEBTN = () => {
    const your = props.data?.your;
    
    return your?
    <span onClick={deleteThisComment}> <FontAwesomeIcon icon={faTrash} /></span> : null
  };

  return (
    <div className='comment-card'>
      <a className="comment-username"> {username} </a>

      <div className='comment'>
         {text}
      </div>

      <div className="post-align-btns">
        <a className="date"> {props.formatDate(date)} </a>
        {DELETEBTN()}
      </div>

    </div>
  )
}