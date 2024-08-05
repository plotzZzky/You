'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@comps/authContext';
import InputPwd from '@comps/inputs/inputPwd';
import InputEmail from '@comps/inputs/inputEmail';
import InputUser from '@comps/inputs/inputUser';
import InputAnswer from '@comps/inputs/inputAnswer';
import InputQuestion from '@comps/inputs/inputQuestion';
import userPicDefault from '../../../public/user.png'

export default function Login() {
  const [getLogin, setLogin] = useState(true);
  const [Token, setToken] = useAuth();
  const router = useRouter();

  const [getUsername, setUsername] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getpwd, setPwd] = useState("")
  const [getImageUser, setImageUser] = useState(userPicDefault);
  const [getFileUser, setFileUser] = useState("user.png");
  const [getQuestion, setQuestion] = useState("");
  const [getAnswer, setAnswer] = useState("");

  //Validate
  const [UserValid, setUserValid] = useState(false);
  const [EmailValid, setEmailValid] = useState(false);
  const [Pwd1Valid, setPwd1Valid] = useState(false);
  const [Pwd2Valid, setPwd2Valid] = useState(false)
  const [QuestionValid, setQuestionValid] = useState(false)
  const [AnswerValid, setAnswerValid] = useState(false)

  function checkLogin() {
    if (Token !== null && typeof Token === 'string') {
      router.push("/app/");
    }
  }

  function clickInput() {
    // Função para o usuario clickar na imagem e simular o click no input
    const input = document.getElementById("selectImgUser").click()
  }

  function changeImage(event) {
    // Carrega a imagem em duas const, a const image para ser enviada pelo form e a file para ser visualizada pelo usuario
    const file = event.target.files[0];
    setImageUser(file)
    const reader = new FileReader();

    reader.onload = function (event) {
      setFileUser(event.target.result)
    };
    reader.readAsDataURL(file);
  }

  function showLogin() {
    // Alterna entre a pagina de login e registro
    const login = document.getElementById('loginTab');
    const signup = document.getElementById('signupTab');
    login.style.display = getLogin? 'none' : 'block'
    signup.style.display = getLogin? 'block' : 'none'
    setLogin(getLogin? false : true)
  }

  function showRecovery() {
    // Redireciona para a pagina de recuperação de senha
    router.push('/login/recovery')
  }

  function checkIfLoginIsvalid() {
    // Verifica se os campos de login estão preenchidas com informções validas
    if (Pwd1Valid && UserValid) {
      loginFunc()
    } else {
      const tip = document.getElementById("LoginTip")
      tip.innerText = "Prencha os dados de login"
    }
  }

  function loginFunc() {
    // Função para fazer login
    const url = `http://127.0.0.1:8000/users/login/`

    const formData = new FormData();
    formData.append("username", getUsername)
    formData.append("password", getPassword)

    const info = {method: 'POST',
                body: formData}

    fetch(url, info)
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token)
          router.push('/app')
        } else {
          const tip = document.getElementById("LoginTip")
          tip.innerText = data.error
        }
    })
  }

  function checkIfSignIsValid() {
    // Verifica se os campos de cadastro estão preenchidas com informções validas
    if (UserValid && EmailValid && Pwd1Valid && Pwd2Valid && Pwd1Valid === Pwd2Valid) {
      SignUpFunc()
    } else {
      const tip = document.getElementById("SignTip")
      tip.innerText = "Prencha os dados para se registar"
    }
  }

  function SignUpFunc() {
    // Função para registar um novo usuario, envia o form com as informações (exceto imagem) e recebe o nome randonizado da imagem do usuario
    const url = `http://127.0.0.1:8000/users/register/`

    const formData = new FormData();
    formData.append("username", getUsername);
    formData.append("email", getEmail);
    formData.append("password", getPassword);
    formData.append("pwd", getpwd);
    formData.append("image", getImageUser, getImageUser.name);
    formData.append("question", getQuestion)
    formData.append("answer", getAnswer)

    const requestData = {
      method: 'POST', 
      body: formData, 
      Headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    fetch(url, requestData)
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token)
          router.push('/app')
        } else {
          const tip = document.getElementById("SignTip")
          tip.innerText = data.msg
        }
      })
  }

  useEffect(() => {
    checkLogin()
  }, [Token]);


  return (
    <>
      <div className='page'>
        <div className="login-page">
          <div id='loginTab'>
            <h2> Bem vindo de volta!</h2>

            <div className='align-input'>
              <InputUser username={setUsername} valid={UserValid} setValid={setUserValid} tip='LoginTip'></InputUser>
              <InputPwd password={setPassword} valid={Pwd1Valid} setValid={setPwd1Valid} placeholder="Digite a senha" tip='LoginTip'></InputPwd>
            </div>

            <h3 id='LoginTip'> </h3>

            <button className='btn-login' onClick={checkIfLoginIsvalid}> Entrar </button>

            <p onClick={showLogin}> Cadastre-se </p>
            <p onClick={showRecovery}> Recuperar senha </p>
          </div>

          <div id='signupTab' style={{display: 'none'}}>
            <h2> Junte-se a nós! </h2>

            <div className='align-input'>
              <div>
                <img className='img-user-preview' onClick={clickInput} src={getFileUser}></img>
                <input type="file" className="select-image" id='selectImgUser' onChange={changeImage}></input>
              </div>

              <InputUser username={setUsername} valid={UserValid} setValid={setUserValid} tip='SignTip'></InputUser>
              <InputEmail email={setEmail} valid={EmailValid} setValid={setEmailValid} tip='SignTip'></InputEmail>
              <InputPwd password={setPassword} valid={Pwd1Valid} setValid={setPwd1Valid} placeholder="Digite a senha" tip='SignTip'></InputPwd>
              <InputPwd password={setPwd} valid={Pwd2Valid} setValid={setPwd2Valid} placeholder="Comfirme a senha" tip='SignTip'></InputPwd>
              <InputQuestion question={setQuestion} valid={QuestionValid} setValid={setQuestionValid} tip='SignTip'></InputQuestion>
              <InputAnswer answer={setAnswer} valid={AnswerValid} setValid={setAnswerValid} tip='SignTip'></InputAnswer>

            </div>

            <h3 id='SignTip'> </h3>

            <button className='btn-login' onClick={checkIfSignIsValid}> Cadastrar </button>

            <p onClick={showLogin}> Entrar </p>
            <p onClick={showRecovery}> Recuperar senha </p>
          </div>
        </div>
      </div>
    </>
  )
}