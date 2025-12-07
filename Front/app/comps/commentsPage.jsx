export default function CommentsPage() {
  const commentText = props.modalData?.text
  const date = props.formatDate(props.modalData?.date)

  const submitNewComment = (event) => {
    // verifica se o botão apertado for o enter e envia o comentario para o backend
    if (event.key === 'Enter') {
      createNewComment();
    }
  };

  function createNewComment() {
    // Função que cria um novo comentario
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
          />
      )))
    }
  };

  return (
    <div>
      <div>
        <p> {commentText}</p>
        <a className="date"> {date} </a>

        <div className='comments-div'>
            <input 
              type='text'
              placeholder='Novo comentario'
              className='input-new-comment'
              value={getComment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={submitNewComment}>
            </input>
            
          {getCards}
        </div>
      </div>
    </div>
  )    
}