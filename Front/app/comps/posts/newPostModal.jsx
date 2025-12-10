import { useState } from "react";
import { useApi } from "@hooks/useApi";
import SelectPostImg from "./selecPostImg";
import '@inputs/inputs.css'


export default function NewPostModal(props) {
  const requestApi = useApi();

  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState();
  const [postFile, setPostFile] = useState();

  function closeThisModal() {
    props.setShowNewPost(false);
    setPostFile(null);
    setPostImg(null);
    setPostText("");
  };

  function setPostTextValue(event) {
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
    const requestData = createNewRequestData();
    const response = await requestApi("posts/", false, requestData);

    if (response.ok) {
      props.showFolloweePosts();
      closeThisModal();
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

  if (props.showNewPost) {
    return (
      <div id="NewPostModal" onClick={closeThisModal}>
        <div className='modal' onClick={e => e.stopPropagation()}>
          
          <SelectPostImg postFile={postFile} setPostFile={setPostFile} setPostImg={setPostImg} />

          <div className='div-input'>
            <input type="text" placeholder="Diga algo" value={postText} onChange={setPostTextValue}/>
          </div>

          <button onClick={validateNewPost}> Publicar </button>

        </div>
      </div>
    )
  }
}