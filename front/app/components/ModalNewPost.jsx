import { useState } from "react";

export default function NewPost(props) {
  const [getToken, setToken] = useState(typeof window !== 'undefined' ? sessionStorage.getItem('token') : undefined);

  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState();
  const [postFile, setPostFile] = useState();

  // Fecha o modal
  function closeModal() {
    let modal = document.getElementById("NewPostModal");
    modal.style.display = 'none'
  }

  // Essa função faz que quando o user clickar na imagem essa função seleciona o input para selecionar uma imagem
  function clickInput() {
    document.getElementById("selectImg").click()
  }

  // Função que carrega a imagem
  // setPostImg carrega a imagem para ser enviada para o back
  // setPostFile carrga a imagem no front 
  function changeImage(event) {
    const file = event.target.files[0];
    setPostImg(file)
    const reader = new FileReader();

    reader.onload = function (event) {
      setPostFile(event.target.result)
    };
    reader.readAsDataURL(file);
  }

  // Salva o texto da postagem no useState
  function setTextFromPost(event) {
    const value = event.target.value
    setPostText(value)
  }

  // Salva o post no back
  function savePost() {
    let url = "http://127.0.0.1:8000/posts/post/"

    const formBack = new FormData();
    formBack.append("text", postText);
    formBack.append('image', postImg.name);

    let requestData = {
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

      .then((data) => {
        const filename = data.filename
        const postId = data.postId
        sendImageToCdn(filename, postId)
      })

      .catch((error) => {
        console.log(error.message)
        alert(error);
      });
  }

  function sendImageToCdn(filename, postId) {
    const url = "http://127.0.0.1:8080/files/post/"

    const formCdn = new FormData();
    formCdn.set('enctype', 'multipart/form-data');
    formCdn.append("token", getToken)
    formCdn.append("image", postImg, filename)

    const requestData = {
      method: 'POST',
      body: formCdn,
    }
 
    fetch(url, requestData)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new CustomError(`Não foi possivel criar o post. status: ${res.status}`);
      }
    })

    .then(() => {
      props.get_posts();
      closeModal();
      setPostFile();
    })

    .catch(error => {
      console.log(error); 
      alert("Não foi possível postar a imagem");
      deletePost(postId);
    });
  }

  // Apagao o post no back se o cdn retornar um erro
  function deletePost(postId) {
    console.log(postId)
    const url = 'http://127.0.0.1:8000/posts/del/'

    const form = new FormData()
    form.append('id', postId)

    const data = {
      method: 'DELETE',
      headers: { Authorization: 'Token ' + getToken },
      body: form
    }

    fetch(url, data)
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