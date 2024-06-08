import { useState, useEffect } from "react";
import { useAuth } from "./authContext";
import InputPwd from './inputs/inputPwd'
import InputEmail from './inputs/inputEmail'
import InputUser from './inputs/inputUser'
import InputQuestion from "./inputs/inputQuestion";
import InputAnswer from "./inputs/inputAnswer";


export default function EditUser(props) {
  const [getToken, setToken] = useAuth();
  const [getData, setData] = useState();

  // Atributos
  const [getUsername, setUsername] = useState();
  const [getEmail, setEmail] = useState();
  const [getPassword1, setPassword1] = useState();
  const [getPassword2, setPassword2] = useState("")
  const [getImageUser, setImageUser] = useState();
  const [getFileUser, setFileUser] = useState("");
  const [getQuestion, setQuestion] = useState("");
  const [getAnswer, setAnswer] = useState("");

  //Validate
  const [UserValid, setUserValid] = useState(false);
  const [EmailValid, setEmailValid] = useState(false);
  const [Pwd1Valid, setPwd1Valid] = useState(false);
  const [Pwd2Valid, setPwd2Valid] = useState(false)
  const [QuestionValid, setQuestionValid] = useState(false)
  const [AnswerValid, setAnswerValid] = useState(false)

  function closeModal() {
    // Fecha este modal
    const modal = document.getElementById("editUser");
    modal.style.display = 'none'
  }
  
  function receiveUserData() {
    // Recebe os dados do perfil do usuario
    const url = `http://127.0.0.1:8000/users/profile/`
    const info = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken }
    }
    fetch(url, info)
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username)
        setEmail(data.email)
        setQuestion(data.profile.question)
        setFileUser(data.profile.image)
      })
  }

  function clickInput() {
    document.getElementById("selectImgUser").click()
  }

  function changeImage(event) {
    const file = event.target.files[0];
    setImageUser(file)
    const reader = new FileReader();

    reader.onload = function (event) {
      setFileUser(event.target.result)
    };
    reader.readAsDataURL(file);
  }

  function sendUpdatedUser() {
    //Envia para o back as alterações do perfil do usuario
    const url = 'http://127.0.0.1:8000/users/update/'

    const formData = new FormData();
    formData.set('enctype', 'multipart/form-data');
    formData.append("username", getUsername);
    formData.append("email", getEmail)
    formData.append("password", getPassword1)
    formData.append("pwd", getPassword2)
    formData.append("question", getQuestion)
    formData.append("answer", getAnswer)
    if (getImageUser) {
      formData.append('image', getImageUser, getImageUser.name);
    }

    const info = {
      method: 'POST',
      headers: { Authorization: 'Token ' + getToken },
      body: formData
    }

    fetch(url, info)
    .then((res) => res.json())
    .then((data) => {
      const text = document.getElementById("EditTip")
      text.innerHTML = data.msg
      props.updateProfile()
    })
  }

  useEffect(() => {
    receiveUserData()
  }, [])

  return (
    <div className="modal-background" id='editUser' style={{ display: 'none' }} onClick={closeModal}>
      <div className="div-edit-user" onClick={(e) => e.stopPropagation()}>
        <p className='login-title'> Edite seu usuario </p>
        <div className='align-input'>
          <div>
            <img className='img-user-preview' onClick={clickInput} src={getFileUser}></img>
            <input type="file" className="select-image" id='selectImgUser' onChange={changeImage}></input>
          </div>

          <InputUser username={setUsername} valid={UserValid} setValid={setUserValid} tip='EditTip' value={getUsername}></InputUser>
          <InputEmail email={setEmail} valid={EmailValid} setValid={setEmailValid} tip='EditTip' value={getEmail}></InputEmail>
          <InputPwd password={setPassword1} valid={Pwd1Valid} setValid={setPwd1Valid} placeholder="Digite a nova senha" tip='EditTip'></InputPwd>
          <InputPwd password={setPassword2} valid={Pwd2Valid} setValid={setPwd2Valid} placeholder="Comfirme a nova senha" tip='EditTip'></InputPwd>
          <InputQuestion question={setQuestion} valid={QuestionValid} setValid={setQuestionValid} tip='EditTip' value={getQuestion}></InputQuestion>
          <InputAnswer answer={setAnswer} valid={AnswerValid} setValid={setAnswerValid} tip='EditTip' ></InputAnswer>
        </div>
        <p className='login-tip' id='EditTip'> </p>
        <button className='btn-mini' onClick={sendUpdatedUser}> Salvar </button>
      </div>
    </div>
  )
}