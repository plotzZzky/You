import { useState, useEffect } from "react";
import { useApi } from "@hooks/useApi";
import CommentCard from "./commentCard";


export default function CommentsPage(props) {
  const fetchApi = useApi();
  const [getNewComment, setNewComment] = useState();
  const [getCards, setCards] = useState([]);

  const commentText = props.text;
  const date = formatDate(props.date);

  useEffect(() => {
    getAllComments();
  }, [])

  function formatDate(value) {
  // Formata a data para ser exibida 
    if (value) {
      const date = value.split("-");
      return `${date[2]}/${date[1]}/${date[0]}`;
    }
  };

  function handleCommentText(event) {
    const text = event.target.value;
    setNewComment(text);
  };

  const submitNewComment = (event) => {
    // verifica se o botão apertado for o enter e envia o comentario para o backend
    if (event.key === 'Enter') {
      createNewComment();
    }
  };

  async function createNewComment() {
    const form = new FormData();
    form.append("text", getNewComment);
    form.append("post", props.postId);

    const requestData = {
      method: "POST",
      body: form,
    }

    const response = await fetchApi("comments/", false, requestData)

    if (response.ok) {
      getAllComments();
    };
  };

  async function getAllComments(){
    // Busca os commentarios no backend
    const url = `comments/${props.postId}/`
    const response = await fetchApi(url, true);

    if (response) {
      createCommentsCards(response);
    }
  };

  function createCommentsCards(value) {
    // Cria os cards dos comentarios 
    if (value) {
      setCards(
        value.map(({id, username, text, date, your}, index) => (
          <CommentCard 
            key={index}
            id={id}
            username={username}
            text={text}
            date={date}
            your={your}
            getAllComments={getAllComments}
            formatDate={formatDate}
          />
      )))
    }
  };

  return (
    <div className="comment-page">
      <p> {commentText} </p>
      <a className="date"> {date} </a>

      <div className='comments-div'>
        <input 
          type='text'
          placeholder='Novo comentario'
          className='input-new-comment'
          value={getNewComment}
          onChange={handleCommentText}
          onKeyDown={submitNewComment}>
        </input>
          
        {getCards}
      </div>
    </div>
  )    
}