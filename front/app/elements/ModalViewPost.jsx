import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faThumbsUp, faCaretRight, faComment, faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUp_r } from '@fortawesome/free-regular-svg-icons'
import CommentCard from './commentCard'


export default function ModalViewPost(props) {
  const [getToken, setToken] = useState(typeof window !== 'undefined'? sessionStorage.getItem('token') : undefined);
  const [getCards, setCards] = useState([])

  const [getComment, setComment] = useState("");

  // Fecha esse modal
  function closeModal() {
    let modal = document.getElementById("PostModal");
    modal.style.display = 'none'
  }

  // Formata a data para ser exibida
  function formatDate(value) {
    if (value) {
    const date = value.split("-")
    return `${date[2]}/${date[1]}/${date[0]}`
    }
  }

  // Cria os cards dos comentarios 
  function createCards() {
    if (props.data.comments) {
      setCards(
        props.data.comments.map((data, index) => (
          <CommentCard key={index} data={data} update_modal={() => props.update_modal(props.data.id)} formatDate={formatDate}></CommentCard>
        )))
    }
  }

  // Deleta esse post
  function deletePost() {
    let url = 'http://127.0.0.1:8000/posts/del/'

    const post_id = props.data.id
    const form = new FormData()
    form.append('id', post_id)

    let data = {
      method: 'DELETE',
      headers: { Authorization: 'Token ' + getToken },
      body: form
    }

    fetch(url, data)
      .then(() => {
        closeModal()
        props.update_posts()
      })
  }

  // Função para dar like ou dislike
  function changeLike() {
    let url = 'http://127.0.0.1:8000/posts/like/'

    const formData = new FormData();
    formData.append('id', props.data.id);

    let data = {
      method: 'POSt',
      headers: { Authorization: 'Token ' + getToken },
      body: formData
    }
    fetch(url, data)
      .then(() => {
        props.update_modal(props.data.id)
      })
  }

  // Função para dar follow ou unfollow
  function followUser() {
    const url = 'http://127.0.0.1:8000/posts/follow/'

    const form = new FormData();
    form.append('id', props.data.user.id);

    const data = {
      method: 'POST',
      headers: { Authorization: 'Token ' + getToken },
      body: form
    }
    fetch(url, data)
      .then(() => {
        props.update_modal(props.data.id)
      })
  }

  // Função que cria um novo comentario
  function addComment() {
    if (getComment) {
      const url = 'http://127.0.0.1:8000/comments/add/'
      const form = new FormData();
      form.append('comment', getComment);
      form.append('id', props.data.id)

      const data = {
        method: 'POST',
        headers: { Authorization: 'Token ' + getToken },
        body: form
      }
      fetch(url, data)
        .then(() => {
          props.update_modal(props.data.id)
          setComment('')
        })
    }
  }

  function showComments() {
    const img = document.getElementById("imgPrev")
    const div_comment = document.getElementById("commentPrev")
    img.style.display = img.style.display === 'none' ? 'block' : 'none';
    div_comment.style.display = div_comment.style.display === 'none' ? 'flex' : 'none';
    createCards()
  }

  useEffect(() => {
    createCards()
  }, [props.data])

  return (
    <div className="modal-background" id="PostModal" onClick={closeModal}>

      <div className='modal-div' onClick={e => e.stopPropagation()}>
        <img className='modal-img' src={props.data?.image} id='imgPrev'></img>

        <div className="modal-info" id='commentPrev'>
          <div className="modal-desc">
            <p> {props.data?.text} </p>
            <a className="date"> {formatDate(props.data?.date)} </a>

            <div className='comments-div'>
              <div className='new-comment'>
                <input type='text' placeholder='Novo comentario' className='input-new-comment' value={getComment}
                  onChange={(e) => setComment(e.target.value)} >
                </input>
                <button className='btn-new-comment' onClick={addComment}>
                  <FontAwesomeIcon icon={faCaretRight} />
                </button>
              </div>
              {getCards}
            </div>
          </div>
        </div>

        <div className="modal-align-name">
          <div className='align-nick'>
            <img className="modal-user-img" src={props.data?.user.img} ></img>
            <a className="modal-username"> {props.data?.user.username} </a>
          </div>

          <div className="modal-align-btns">
            <button className='modal-btn' onClick={followUser} style={{ display: props.data?.your ? 'none' : 'block' }}>
              {props.data?.user.follow ?
                <FontAwesomeIcon icon={faUserMinus} /> :
                <FontAwesomeIcon icon={faUserPlus} />}
            </button>

            <button className='modal-btn' onClick={changeLike}>
              {props.data?.liked ?
                <FontAwesomeIcon icon={faThumbsUp} /> :
                <FontAwesomeIcon icon={faThumbsUp_r} />
              }<a>{props.data?.likes}</a>
            </button>

            <button className='modal-btn' onClick={showComments}> <FontAwesomeIcon icon={faComment} />
              <a> {props.data?.comments.length} </a>
            </button>

            {props.data?.your ?
              <button className="modal-btn" onClick={deletePost}> <FontAwesomeIcon icon={faTrash} /></button> :
              ''
            }
          </div>
        </div>
      </div>
    </div>
  )
}