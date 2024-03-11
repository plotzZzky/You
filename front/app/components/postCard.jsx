
export default function PostCard(props) {

  // Exibe o modal de visualização de uma imagem
  function show_modal() {
    props.get_info()
  }

  // Deleta o post
  function delete_post() {
    const url = 'http://127.0.0.1:8000/post/'
    const post_id = props.data.post_id
    
    const form = new FormData()
    form.append('id', post_id)

    const data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken },
      body: form
    }

    fetch(url, data)
      .then(() => {
        props.update()
      })
  }

  return (
    <div className='card-margin'>
      <div className="card" onClick={show_modal}>
        <img className="card-img" src={props.data?.image} loading='lazy'></img>
      </div>
    </div>
  )
}