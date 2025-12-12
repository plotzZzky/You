import { useState } from "react";
import InputUser from "@inputs/inputUser";
import ImgInput from "@/app/comps/inputs/inputImg"
import InputQuestion from "@inputs/inputQuestion";
import InputAnswer from "@inputs/inputAnswer";
import "@inputs/inputs.css"


export default function EditUserModal(props) {
  // User data
  const [getUsername, setUsername] = useState(props.username);
  const [getQuestion, setQuestion] = useState(props.question);
  const [getAnswer, setAnswer] = useState("");
  const [getDesc, setDesc] = useState("");
  const [getImageUser, setImageUser] = useState("");
  const [getFileUser, setFileUser] = useState(props.picture);

  //Validate
  const [userValid, setUserValid] = useState(false);
  const [questionValid, setQuestionValid] = useState(false)
  const [answerValid, setAnswerValid] = useState(false)

  function handleDesc(event) {
    const value = event.target.value;

    setDesc(value);
  };

  async function updateUserFunction() {
    /**
    * Atualiza algumas informações do usuário
    */
    const url = "auth/recovery/update/";
    const requestData = createRequestDataAndForm(true);
    const response = await fetchApi(url, returnJson, requestData);

    if (response.ok) {
      checkAuthStatus();
    }
  };

  function createRequestDataAndForm() {
    const form = new FormData();
    form.append("username", getUsername);
    form.append("question", getQuestion);
    form.append("answer", getAnswer);

    if (getImageUser) {
      form.set('enctype', 'multipart/form-data');
      form.append("picture", getImageUser, getImageUser.name);
    }

    const requestData = {
      method: "POST",
      body: form,
    };

    return requestData;
  };

  if (props.showEditUserModal) {
    return (
      <div id="EditUserModal" onClick={props.showEditUserModalFunc}>
          <div className='modal' id="editUser" onClick={e => e.stopPropagation()}>
            <h3> Alterar perfil </h3>

            <ImgInput setImageUser={setImageUser} getFileUser={getFileUser} setFileUser={setFileUser}/>
            <InputUser value={getUsername} setValue={setUsername} valid={userValid} setValid={setUserValid}/>
            <InputQuestion value={getQuestion} setValue={setQuestion} valid={questionValid} setValid={setQuestionValid}/>
            <InputAnswer value={getAnswer} setValue={setAnswer} valid={answerValid} setValid={setAnswerValid}/>

            <div className="div-input">
              <textarea value={getDesc} onChange={handleDesc}/>
            </div>

            <button onClick={updateUserFunction}> Salvar </button>
        </div>
      </div>
    )
  }
}