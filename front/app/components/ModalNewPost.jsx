import { useState } from "react";
import { useAuth } from "./authContext";

export default function NewPost(props) {
  const [getToken, setToken] = useAuth();

  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState();
  const [postFile, setPostFile] = useState();

  function closeModal() {
    // Fecha o modal
    const modal = document.getElementById("NewPostModal");
    modal.style.display = 'none'
  }

  function clickInput() {
    // Essa função faz que quando o user clickar na imagem essa função seleciona o input para selecionar uma imagem
    document.getElementById("selectImg").click()
  }

  function changeImage(event) {
    // Função que carrega a imagem
    // setPostImg carrega a imagem para ser enviada para o back
    // setPostFile carrga a imagem no front 

    const file = event.target.files[0];
    setPostImg(file)
    const reader = new FileReader();

    reader.onload = function (event) {
      setPostFile(event.target.result)
    };
    reader.readAsDataURL(file);
  }

  function setTextFromPost(event) {
    // Salva o texto da postagem no useState
    const value = event.target.value
    setPostText(value)
  }

  function savePost() {
    // Salva o post no back
    const url = "http://127.0.0.1:8000/posts/"

    const formBack = new FormData();
    formBack.append("text", postText);
    formBack.append('image', postImg, postImg.name);

    const requestData = {
      method: 'POST',
      headers: { Authorization: 'Token ' + getToken },
      body: formBack
    }

    fetch(url, requestData)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new CustomError(`Não foi possivel criar o post. status: ${res.status}`);
        }
      })

      .then(() => {
        props.getPosts();
        closeModal();
        setPostFile();
      })

      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div className="modal-background" id="NewPostModal" onClick={closeModal}>
      <div className='modal-div' onClick={e => e.stopPropagation()}>
        <img className='img-preview' onClick={clickInput} src={postFile}></img>
        <input type="file" className="select-image" id='selectImg' onChange={changeImage}></input>
        <input type="text" placeholder="Diga algo" className="input-text-desc" value={postText} onChange={setTextFromPost}></input>
        <button className="btn-mini" onClick={savePost}> Publicar </button>
      </div>
    </div>
  )
}