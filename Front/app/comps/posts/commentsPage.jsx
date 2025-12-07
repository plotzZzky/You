import { useState } from "react";
import { useApi } from "../hooks/useApi";


export default function CommentsPage(props) {
  const fetchApi = useApi();

  const [getComment, setComment] = useState();
  const [getCards, setCards] = useState([]);

  const commentText = props.text;
  const date = formatDate(props.date);

  function formatDate(value) {
  // Formata a data para ser exibida 
    if (value) {
      const date = value.split("-");
      return `${date[2]}/${date[1]}/${date[0]}`;
    }
  };

  function handleCommentText(event) {
    const text = event.target.value;
    setComment(text);
  };

  const submitNewComment = (event) => {
    // verifica se o botão apertado for o enter e envia o comentario para o backend
    if (event.key === 'Enter') {
      createNewComment();
    }
  };

  async function createNewComment() {
    const url = ""
    const response = await fetchApi("")
  };

  function getAllComments(){
    // Busca os commentarios no backend

    createCommentsCards(value);
  };

  function createCommentsCards(value) {
    // Cria os cards dos comentarios 
    if (value) {
      setCards(
        value.map((data, index) => (
          <CommentCard 
            key={index}
            data={data}
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
          value={getComment}
          onChange={handleCommentText}
          onKeyDown={submitNewComment}>
        </input>
          
        {getCards}
      </div>
    </div>
  )    
}