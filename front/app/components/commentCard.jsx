import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function CommentCard(props) {
  const [getToken, setToken] = useState(typeof window !== 'undefined'? sessionStorage.getItem('token') : undefined);

  function delComment() {
    const commentId = props.data.id
    const url = `http://127.0.0.1:8000/comments/comment/${commentId}/`

    const data = {
      method: 'DELETE',
      headers: { Authorization: 'Token ' + getToken },
    }

    fetch(url, data)
      .then(() => {
        props.updateModal()
      })
  }

  return (
    <div className='comment-card'>
      <a className="comment-username"> {props.data?.username} </a>
      <div className='comment'>
         {props.data?.text}
      </div>
      <div className="post-align-btns">
        <a className="date"> {props.formatDate(props.data?.date)} </a>
        {props.data?.your ?
          <a className="post-delete" onClick={delComment}> <FontAwesomeIcon icon={faTrash} /></a> :
          ''
        }
      </div>
    </div>
  )
}