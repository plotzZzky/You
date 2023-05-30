import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)


export default function CommentCard(props) {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));

  function del_comment(comment_id) {
    let url = `http://127.0.0.1:8000/posts/comment/del/id=${props.data.id}/`
    let header = {
      method: 'DELETE',
      headers: { Authorization: 'Token ' + getToken }
    }
    fetch(url, header)
      .then(() => {
        props.update_modal()
      })
  }



  return (
    <div className='comment-card'>
      <a className="comment-username"> {props.data?.username} </a>
      <div className='comment'>
        <p> {props.data?.text} </p>
      </div>
      <div className="post-align-btns">
        <a className="post-date"> {props.data?.date} </a>
        {props.data?.your ?
          <a className="post-delete" onClick={del_comment}> <FontAwesomeIcon icon="fa-solid fa-trash" /></a> :
          ''
        }
      </div>
    </div>
  )
}