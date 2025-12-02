import { useState } from "react";
import { useApi } from "./hooks/useApi";
import SelectPostImg from "./selecPostImg";


export default function NewPostModal(props) {
  const requestApi = useApi();

  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState();
  const [postFile, setPostFile] = useState();

  function closeModal() {
    props.setShowNewPostModal(false);
    setPostFile(null);
    setPostImg(null);
    setPostText("");
  };

  function setPostText(event) {
    const value = event.target.value;
    setPostText(value);
  };

  function validateNewPost() {
    // Verifica se o post possui uma imagem
    if (postImg) {
      createNewPost();

    } else {
      alert("O post precisa de uma imagem!");
    }
  };

  async function createNewPost() {
  // Cria um novo post
    const requetData = createNewRequestData();
    const response = await requestApi("POSTS", requetData, false);

    if (response.ok) {
      closeModal();
    };
  };

  function createNewRequestData() {
    const form = new FormData();
    form.append("text", postText);
    form.append('image', postImg, postImg.name);

    const requestData = {
      method: 'POST',
      body: form,
      credentials: 'include',
    }

    return requestData;
  };

  if (props.shoNewPostModal) {
    return (
      <div id="NewPostModal" onClick={closeModal}>
        <div className='modal' onClick={e => e.stopPropagation()}>
          
          <SelectPostImg/>

          <input type="text" placeholder="Diga algo" className="input-text-desc" value={postText} onChange={setPostText}></input>

          <button className="btn-mini" onClick={validateNewPost}> Publicar </button>

        </div>
      </div>
    )
  }
}