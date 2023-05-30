import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)


export default function PostCard(props) {

  function delete_post(post_id) {
    let url = `http://127.0.0.1:8000/post/delete/id=${post_id}`
    let data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken }
    }
    fetch(url, data)
      .then((reponse) => reponse.json())
      .then((data) => {
        alert(data.text)
        props.update()
        get_all_notes()
      })
  }

  return (
    <div className='card-background' style={{ flex: props.horizon ? '0 0 25%' : '0 0 50%' }}>
      <div className="card-post" onClick={props.open}>
        <img className="card-img" src={`http://127.0.0.1:8000/${props.data?.image}/`} loading='lazy'></img>
      </div>
    </div>
  )
}