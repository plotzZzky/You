import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faThumbsUp, faCaretRight, faComment, faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUp_r } from '@fortawesome/free-regular-svg-icons'
import CommentCard from './commentCard'

library.add( faTrash, faCaretRight, faThumbsUp, faThumbsUp_r, faComment, faUserPlus, faUserMinus )


export default function Modal(props) {
    const [getToken, setToken] = useState(sessionStorage.getItem('token'));
    const [viewImg, setViewImg] = useState(true)
    const [Comment, setComment] = useState("");
    const [getDate, setDate] = useState("");

    function close_modal() {
        let modal = document.getElementById("Modal");
        modal.style.display = 'none'
        document.body.style.position = ''
    }

    function format_date() {
        const date = '2023-05-03'.split("-")
        setDate(`${date[2]}/${date[1]}/${date[0]}`)
    }

    function show_comments() {
        const img = document.getElementById("imgPrev")
        const div_comment = document.getElementById("commentPrev")
        img.style.display = viewImg? 'none' : 'block'
        div_comment.style.display = viewImg? 'flex' : 'none'
        setViewImg(viewImg? false: true)
    }

    function delete_post() {
        let url = `http://127.0.0.1:8000/posts/del/id=${props.data.id}/`
        let data = {method: 'DELETE', 
                    headers: {Authorization: 'Token '+ getToken}}
        fetch(url, data)
        .then(() => {
            close_modal()
            update_modal()
            props.update_posts()
        })
    }

    function like() {
        let url = `http://127.0.0.1:8000/posts/like/id=${props.data?.id}/`
        let data = {method: 'GET', 
                    headers: {Authorization: 'Token '+ getToken}}
        fetch(url, data)
        .then(() => {
            update_modal()
        })
    }

    function follow_user() {
        let url = `http://127.0.0.1:8000/posts/follow/id=${props.data?.user.id}/`
        let data = {method: 'GET', 
                    headers: {Authorization: 'Token '+ getToken}}
        fetch(url, data)
        .then(() => {
            update_modal()
            props.update_posts()
        })
    }

    function add_comment() {
        let url = `http://127.0.0.1:8000/posts/comment/add/id=${props.data?.id}/`
        const formData = new FormData();
        formData.append('comment', Comment);

        let header = {method: 'POST', 
                    headers: {Authorization: 'Token '+ getToken},
                    body: formData}
        fetch(url, header)
        .then(() => {
            update_modal()
            setComment("")
        })
    }

    //Essa função permite que os comentarios ao ser apagados possam atualizar o modal mesmo sem ter acesso ao id do modal
    function update_modal() {
        props.update_info(props.data.id)
    }

    // Esssa função faz que sempre que abrir o modal apareça a imagem e não os comentarios
    function show_image() {
        const img = document.getElementById("imgPrev")
        const div_comment = document.getElementById("commentPrev")
        img.style.display = 'block'
        div_comment.style.display =  'none'
        setViewImg(true)
    }

    useEffect(() => {
        format_date()
        show_image()
    }, [props.data?.image])

    return (
            <div className="modal-background" id="Modal" onClick={close_modal}>
                <div className='modal-new'  onClick={e => e.stopPropagation()}>
                    <img className='modal-img' src={`http://127.0.0.1:8000/${props.data?.image}/`} id='imgPrev'></img>

                    <div className="modal-info" id='commentPrev'>
                            <div className="modal-desc">
                                <p> {props.data?.text}</p>
                                <a className="modal-date"> {getDate} </a> 
                            </div>
                        <div className='comments-div'>
                            <div className='new-comment'>
                                <input type='text' placeholder='Novo comentario' className='input-new-comment' value={Comment} 
                                    onChange={(e) => setComment(e.target.value)}>
                                </input>
                                <button className='btn-new-comment' onClick={add_comment}> 
                                    <FontAwesomeIcon icon="fa-solid fa-caret-right"/> 
                                </button>
                            </div>
                            {props.data?.comments.map((data) => (
                                <CommentCard data={data} update_modal={update_modal}></CommentCard>
                            ))}
                        </div>
                    </div>
                    
                    <div className="modal-align-name">
                        <div className='align-nick'>
                            <img className="modal-user-img" src={`http://127.0.0.1:8000/${props.data?.user.img}/`} ></img>
                            <a className="modal-username"> {props.data?.user.username} </a>
                        </div>

                        <div className="modal-align-btns">
                            <button className='modal-btn' onClick={follow_user} style={{display: props.data?.your? 'none': 'block'}}> 
                                    {props.data?.user.follow? 
                                    <FontAwesomeIcon icon="fa-solid fa-user-minus" /> : 
                                    <FontAwesomeIcon icon="fa-solid fa-user-plus" />} 
                            </button>
                            <button className='modal-btn' onClick={like}> 
                                {props.data?.liked? 
                                    <FontAwesomeIcon icon="fa-solid fa-thumbs-up"  /> :
                                    <FontAwesomeIcon icon="fa-regular fa-thumbs-up" /> 
                                }<a>{props.data?.likes}</a>
                            </button>
                            <button className='modal-btn' onClick={show_comments}> <FontAwesomeIcon icon="fa-solid fa-comment" /> 
                                {props.data?.comments.length} 
                            </button> 

                            {props.data?.your?
                                <button className="modal-btn" onClick={delete_post}> <FontAwesomeIcon icon="fa-solid fa-trash" /></button>:
                                ''
                                }
                        </div>
                    </div>     
                </div>
            </div>
        )
}