import { useState } from "react";

export default function NewPost(props) {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));

  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState();
  const [postFile, setPostFile] = useState();

  // Fecha o modal
  function close_modal() {
    let modal = document.getElementById("NewPostModal");
    modal.style.display = 'none'
  }

  // Essa função faz que quando o user clickar na imagem essa função seleciona o input para selecionar uma imagem
  function click_input() {
    document.getElementById("selectImg").click()
  }

  // Função que carrega a imagem
  // setPostImg carrega a imagem para ser enviada para o back
  // setPostFile carrga a imagem no front 
  function change_image(event) {
    const file = event.target.files[0];
    setPostImg(file)
    const reader = new FileReader();

    reader.onload = function (event) {
      setPostFile(event.target.result)
    };
    reader.readAsDataURL(file);
  }

  // Salva o texto da postagem no useState
  function set_text_from_post(event) {
    const value = event.target.value
    setPostText(value)
  }

  // Salva o post no back
  function save_post() {
    let url = "http://127.0.0.1:8000/posts/add/"

    const formData = new FormData();
    formData.set('enctype', 'multipart/form-data');
    formData.append("text", postText);
    formData.append('image', postImg, postImg.name);

    let info = {
      method: 'POST',
      headers: { Authorization: 'Token ' + getToken },
      body: formData
    }

    fetch(url, info)
      .then(() => {
        props.get_posts()
        close_modal()
        setPostFile()
      })
  }

  return (
    <div className="modal-background" id="NewPostModal" onClick={close_modal}>
      <div className='modal-new' onClick={e => e.stopPropagation()}>
        <img className='img-preview' onClick={click_input} src={postFile}></img>
        <input type="file" className="select-image" id='selectImg' onChange={change_image}></input>
        <input type="text" placeholder="Diga algo" className="input-text-desc" value={postText} onChange={set_text_from_post}></input>
        <button className="btn-mini" onClick={save_post}> Publicar </button>
      </div>
    </div>
  )
}