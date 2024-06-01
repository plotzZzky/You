import { useEffect, useState } from 'react'
import { useAuth } from './authContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faThumbsUp, faComment, faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUp_r } from '@fortawesome/free-regular-svg-icons'
import CommentCard from './commentCard'


export default function ModalViewPost(props) {
  const [Token, setToken] = useAuth();
  const [modalData, setModalData] = useState();
  const [getCards, setCards] = useState([])
  const [getComment, setComment] = useState("");

  function getModalData(postId) {
    // Busca informações de um post 
    const url = `http://127.0.0.1:8000/posts/${postId}/`

    const data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + Token },
    }

    fetch(url, data)
      .then((res) => res.json())
      .then((data) => {
        setModalData(data)
      })
      .then(() => changeVisiblityModalDivs())
  }

  function changeVisiblityModalDivs() {
    // Sempre que abrir o modal exibe a imagem e ocualt os comentarios
    const modal = document.getElementById("PostModal")
    const modalVisibility = modal.style.display
    
    if (modalVisibility !== 'flex') {
    const img = document.getElementById("imgPrev")
    const div_comment = document.getElementById("commentPrev")

    modal.style.display = "flex"
    img.style.display = 'block';
    div_comment.style.display = 'none';
    }
  }

  function closeModal() {
    // Fecha esse modal
    props.setModalId(undefined);
    const modal = document.getElementById("PostModal");
    modal.style.display = 'none';
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
    const postId = modalData.id
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
    const postId = modalData.id
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
    formData.append('id', modalData.id);

    const data = {
      method: 'POSt',
      headers: { Authorization: 'Token ' + Token },
      body: formData
    }
    fetch(url, data)
      .then(() => {
        getModalData(props.modalId)
      })
  }

  function followUser() {
    // Função para dar follow ou unfollow
    const url = 'http://127.0.0.1:8000/follow/'

    const form = new FormData();
    form.append('id', modalData.user.id);

    const data = {
      method: 'POST',
      headers: { Authorization: 'Token ' + Token },
      body: form
    }
    fetch(url, data)
      .then(() => {
        getModalData(props.modalId)
      })
  }

  const submitNewComment = (event) => {
    if (event.key === 'Enter') {  // verifica se o botão apertado for o enter
      if (Token) {
        addNewComment()
      }
    }
  }

  function addNewComment() {
    // Função que cria um novo comentario
    if (getComment) {
      const url = 'http://127.0.0.1:8000/comments/'
      const form = new FormData();
      form.append('comment', getComment);
      form.append('postId', modalData.id)

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

  useEffect(() => {
    if( props.modalId !== undefined) {
      getModalData(props.modalId)
    }

  }, [props.modalId])

  return (
    <div className="modal-background" id="PostModal" onClick={closeModal}>

      <div className='modal-div' onClick={e => e.stopPropagation()}>
        <img className='modal-img' src={modalData?.image} id='imgPrev'></img>

        <div className="modal-info" id='commentPrev'>
          <div className="modal-desc">
            <p> {modalData?.text}</p>
            <a className="date"> {formatDate(modalData?.date)} </a>

            <div className='comments-div'>
                <input 
                  type='text' placeholder='Novo comentario' className='input-new-comment' value={getComment}
                  onChange={(e) => setComment(e.target.value)} onKeyDown={submitNewComment}>
                </input>
              {getCards}
            </div>
          </div>
        </div>

        <div className="modal-align-name">
          <div className='align-nick'>
            <img className="modal-user-img" src={modalData?.user.profile?.image} ></img>
            <a className="modal-username"> {modalData?.user.username} </a>
          </div>

          <div className="modal-align-btns">
            <button className='modal-btn' onClick={followUser} style={{ display: modalData?.your ? 'none' : 'block' }}>
              {modalData?.user.follow ?
                <FontAwesomeIcon icon={faUserMinus} /> :
                <FontAwesomeIcon icon={faUserPlus} />}
            </button>

            <button className='modal-btn' onClick={changeLike}>
              {props.data?.liked ?
                <FontAwesomeIcon icon={faThumbsUp} /> :
                <FontAwesomeIcon icon={faThumbsUp_r} />
              }<a>{modalData?.likes.length}</a>
            </button>

            <button className='modal-btn' onClick={showComments}> <FontAwesomeIcon icon={faComment} />
              <a> {modalData?.comments.length} </a>
            </button>

            {modalData?.your ?
              <button className="modal-btn" onClick={deletePost}> <FontAwesomeIcon icon={faTrash} /></button> :
              ''
            }
          </div>
        </div>
      </div>
    </div>
  )
}