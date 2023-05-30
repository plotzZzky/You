import { useState, useEffect } from "react";

import InputPwd from './inputs/inputPwd'
import InputEmail from './inputs/inputEmail'
import InputUser from './inputs/inputUser'


export default function EditUser(props) {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));
  const [getData, setData] = useState({});

  const [getUsername, setUsername] = useState(getData.username);
  const [getEmail, setEmail] = useState(getData.email);
  const [getPassword1, setPassword1] = useState();
  const [getPassword2, setPassword2] = useState("")
  const [getImageUser, setImageUser] = useState();
  const [getFileUser, setFileUser] = useState("");

  //Validate
  const [UserValid, setUserValid] = useState(false);
  const [EmailValid, setEmailValid] = useState(false);
  const [Pwd1Valid, setPwd1Valid] = useState(false);
  const [Pwd2Valid, setPwd2Valid] = useState(false)


  function get_user_infos() {
    let url = `http://127.0.0.1:8000/users/profile/`
    let info = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken }
    }
    fetch(url, info)
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username)
        setEmail(data.email)
        setFileUser(`http://127.0.0.1:8000/${data.image}/`)
      })
  }

  function click_input() {
    const input = document.getElementById("selectImgUser").click()
  }

  function change_image(event) {
    const file = event.target.files[0];
    setImageUser(file)
    const reader = new FileReader();

    reader.onload = function (event) {
      setFileUser(event.target.result)
    };
    reader.readAsDataURL(file);
  }

  function edit_user() {
    let url = `http://127.0.0.1:8000/users/edit/`
    const formData = new FormData();
    formData.set('enctype', 'multipart/form-data');
    formData.append("username", getUsername);
    formData.append("email", getEmail)
    formData.append("password1", getPassword1)
    formData.append("password2", getPassword2)
    if (getImageUser) {
      formData.append('image', getImageUser, getImageUser.name);
    }

    let info = {
      method: 'POST',
      headers: { Authorization: 'Token ' + getToken },
      body: formData
    }

    fetch(url, info)
    const text = document.getElementById("EditTip")
    text.innerHTML = 'Dados atualizados'
  }

  useEffect(() => {
    get_user_infos()
  }, [])

  return (
    <div className='app-page' id='profileView' style={{ display: 'none' }}>
      <div className="div-edit-user">
        <div className='align-input'>
          <div>
            <img className='img-user-preview' onClick={click_input} src={getFileUser}></img>
            <input type="file" className="select-image" id='selectImgUser' onChange={change_image}></input>
          </div>

          <InputUser username={setUsername} valid={UserValid} setValid={setUserValid} tip='EditTip' value={getUsername}></InputUser>
          <InputEmail email={setEmail} valid={EmailValid} setValid={setEmailValid} tip='EditTip' value={getEmail}></InputEmail>
          <InputPwd password={setPassword1} valid={Pwd1Valid} setValid={setPwd1Valid} placeholder="Digite a nova senha" tip='EditTip'></InputPwd>
          <InputPwd password={setPassword2} valid={Pwd2Valid} setValid={setPwd2Valid} placeholder="Comfirme a nova senha" tip='EditTip'></InputPwd><br />
          <a className='login-tip' id='EditTip'> </a>
        </div>
        <button className='btn' onClick={edit_user}> Salvar </button>
      </div>
    </div>
  )
}