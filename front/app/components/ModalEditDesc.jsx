import { useState, useEffect } from "react";
import { useAuth } from "./authContext";

export default function EditDesc(props) {
  const [getToken, setToken] = useAuth();
  const [getDesc, setDesc] = useState("");

  function closeModal() {
    // Fecha este modal
    const modal = document.getElementById("editDesc");
    modal.style.display = 'none'
  }
  
  function receiveDesc() {
    // Recebe os dados do perfil do usuario
    const url = `http://127.0.0.1:8000/users/profile/`
    const info = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken }
    }
    fetch(url, info)
      .then((res) => res.json())
      .then((data) => {
        setDesc(data.profile.desc)
      })
  }

  function sendNewDesc() {
    // Envia para o back as alterações do perfil do usuario
    const url = 'http://127.0.0.1:8000/users/update/'

    const formData = new FormData();
    formData.append("desc", getDesc);

    const info = {
      method: 'POST',
      headers: { Authorization: 'Token ' + getToken },
      body: formData
    }

    fetch(url, info)
    .then((res) => res.json())
    .then(() => {
      props.updateProfile()
      closeModal()
    })
  }

  function changeDesc(event) {
    const value = event.target.value
    setDesc(value)
  }

  useEffect(() => {
    receiveDesc()
  }, [])

  return (
    <div className="modal-background" id='editDesc' style={{ display: 'none' }} onClick={closeModal}>
      <div className="div-edit-user" onClick={(e) => e.stopPropagation()}>
        <p className='login-title'> Edite sua descrição </p>
        <div className='align-input'>
          <textarea placeholder="Crie sua nova descrição" value={getDesc} onChange={changeDesc} className="edit-desc"></textarea>
        </div>
        <button className='btn-mini' onClick={sendNewDesc}> Salvar </button>
      </div>
    </div>
  )
}