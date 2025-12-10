import { useApi } from '@hooks/useApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function CommentCard(props) {
  const fetchApi = useApi();

  async function deleteThisComment() {
    const url = `comments/${props.id}/`;

    const requestData = {
      method: "DELETE",
    };

    const response = await fetchApi(url, false, requestData);

    if (response) {
      props.getAllComments();
    }
  }

  const DELETEBTN = () => {
    const your = props?.your;
    
    return your?
    <a onClick={deleteThisComment}> <FontAwesomeIcon icon={faTrash} /></a> : null
  };

  return (
    <div className='comment-card'>

      <div className='comment'>
        {props.text}
      </div>

      <div className="comment-align">
        <a> {props.username} </a>

        <div>
          <a className="date"> {props.formatDate(props.date)} </a>

          {DELETEBTN()}
        </div>
      </div>

    </div>
  )
}