import { useEffect, useState } from 'react'
import { useAuth } from './authContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faThumbsUp, faCaretRight, faComment, faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUp_r } from '@fortawesome/free-regular-svg-icons'
import CommentCard from './commentCard'


export default function ModalViewPost(props) {
  const [Token, setToken] = useAuth();
  const [getCards, setCards] = useState([])
  const [getComment, setComment] = useState("");

  function closeModal() {
    // Fecha esse modal
    const modal = document.getElementById("PostModal");
    modal.style.display = 'none'
  }

  function formatDate(value) {
    // Formata a data para ser exibida 
    if (value) {
    const date = value.split("-")
    return `${date[2]}/${date[1]}/${date[0]}`
    }
  }

  function getAllComments(){
    // Busca os commentarios no backend
    const postId = props.data.id
    const url = `http://127.0.0.1:8000/comments/${postId}/`

    const data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + Token}
    }

    fetch(url, data)
      .then((res) => res.json())
      .then((data) => {
        createCards(data)
      })
  }

  function createCards(value) {
    // Cria os cards dos comentarios 
    setCards(
      value.map((data, index) => (
        <CommentCard key={index} data={data} formatDate={formatDate} getAllComments={getAllComments}></CommentCard>
    )))
  }

  function deletePost() {
    // Deleta esse post
    const postId = props.data.id
    const url = `http://127.0.0.1:8000/posts/${postId}/`

    const data = {
      method: 'DELETE',
      headers: { Authorization: 'Token ' + Token },
    }

    fetch(url, data)
      .then(() => {
        closeModal()
        props.updatePosts()
      })
  }

  function changeLike() {
    // Função para dar like ou dislike
    const url = 'http://127.0.0.1:8000/like/'

    const formData = new FormData();
    formData.append('id', props.data.id);

    const data = {
      method: 'POSt',
      headers: { Authorization: 'Token ' + Token },
      body: formData
    }
    fetch(url, data)
      .then(() => {
        props.updateModal(props.data.id)
      })
  }

  function followUser() {
    // Função para dar follow ou unfollow
    const url = 'http://127.0.0.1:8000/follow/'

    const form = new FormData();
    form.append('id', props.data.user.id);

    const data = {
      method: 'POST',
      headers: { Authorization: 'Token ' + Token },
      body: form
    }
    fetch(url, data)
      .then(() => {
        props.updateModal(props.data.id)
      })
  }

  function addNewComment() {
    // Função que cria um novo comentario
    if (getComment) {
      const url = 'http://127.0.0.1:8000/comment/'
      const form = new FormData();
      form.append('comment', getComment);
      form.append('postId', props.data.id)

      const data = {
        method: 'POST',
        headers: { Authorization: 'Token ' + Token },
        body: form
      }
      fetch(url, data)
        .then(() => {
          getAllComments()
          setComment('')
        })
    }
  }

  function showComments() {
    // Altera a visibilidade dos comentarios
    getAllComments()

    const img = document.getElementById("imgPrev")
    const div_comment = document.getElementById("commentPrev")
    img.style.display = img.style.display === 'none' ? 'block' : 'none';
    div_comment.style.display = div_comment.style.display === 'none' ? 'flex' : 'none';
  }

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
                <button className='btn-new-comment' onClick={addNewComment}>
                  <FontAwesomeIcon icon={faCaretRight} />
                </button>
              </div>
              {getCards}
            </div>
          </div>
        </div>

        <div className="modal-align-name">
          <div className='align-nick'>
            <img className="modal-user-img" src={props.data?.user.profile?.image} ></img>
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