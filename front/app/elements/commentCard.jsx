import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function CommentCard(props) {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));

  function delComment() {
    const url = 'http://127.0.0.1:8000/comments/del/'
    const comment_id = props.data.id

    const form = new FormData()
    form.append('id', comment_id)

    const data = {
      method: 'DELETE',
      headers: { Authorization: 'Token ' + getToken },
      body: form
    }

    fetch(url, data)
      .then(() => {
        props.update_modal()
      })
  }


  return (
    <div className='comment-card'>
      <a className="comment-username"> {props.data?.username} </a>
      <div className='comment'>
         {props.data?.text}
      </div>
      <div className="post-align-btns">
        <a className="date"> {props.data?.date} </a>
        {props.data?.your ?
          <a className="post-delete" onClick={delComment}> <FontAwesomeIcon icon={faTrash} /></a> :
          ''
        }
      </div>
    </div>
  )
}