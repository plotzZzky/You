'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputPwd from '@comps/inputs/inputPwd';
import InputEmail from '@comps/inputs/inputEmail';
import InputUser from '@comps/inputs/inputUser';
import InputAnswer from '@comps/inputs/inputAnswer';
import InputQuestion from '@comps/inputs/inputQuestion';
import userPicDefault from '../../../public/user.png'

export default function Login() {
  const [getLogin, setLogin] = useState(true);
  const [getToken, setToken] = useState(typeof window !== 'undefined'? sessionStorage.getItem('token') : undefined);
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
    if (getToken !== '') {
      router.push("/app/");
    }
  }

  // Função para o usuario clickar na imagem e simular o click no input
  function clickInput() {
    const input = document.getElementById("selectImgUser").click()
  }

  // Carrega a imagem em duas const, a const image para ser enviada pelo form e a file para ser visualizada pelo usuario
  function changeImage(event) {
    const file = event.target.files[0];
    setImageUser(file)
    const reader = new FileReader();

    reader.onload = function (event) {
      setFileUser(event.target.result)
    };
    reader.readAsDataURL(file);
  }

  // Alterna entre a pagina de login e registro
  function showLogin() {
    let login = document.getElementById('loginTab');
    let signup = document.getElementById('signupTab');
    login.style.display = getLogin? 'none' : 'flex'
    signup.style.display = getLogin? 'flex' : 'none'
    setLogin(getLogin? false : true)
  }

  // Redireciona para a pagina de recuperação de senha
  function showRecovery() {
    router.push('/login/recovery')
  }

  // Verifica se os campos de login estão preenchidas com informções validas
  function checkIfLoginIsvalid() {
    if (Pwd1Valid && UserValid) {
      loginFunc()
    } else {
      const tip = document.getElementById("LoginTip")
      tip.innerText = "Prencha os dados de login"
    }
  }

  // Função para fazer login
  function loginFunc() {
    let url = `http://127.0.0.1:8000/users/login/`

    const formData = new FormData();
    formData.append("username", getUsername)
    formData.append("password", getPassword)
    let info = {method: 'POST',
                body: formData}

    fetch(url, info)
      .then((res) => res.json())
      .then((data) => {
        if (data.msg) {
          const tip = document.getElementById("LoginTip")
          tip.innerText = data.msg
        } else {
          sessionStorage.setItem("token", data["token"])
          router.push('/app')
        }
    })
  }

  // Verifica se os campos de cadastro estão preenchidas com informções validas
  function checkIfSignIsValid() {
    if (UserValid && EmailValid && Pwd1Valid && Pwd2Valid && Pwd1Valid === Pwd2Valid) {
      SignUpFunc()
    } else {
      const tip = document.getElementById("SignTip")
      tip.innerText = "Prencha os dados para se registar"
    }
  }

  // Função para registar um novo usuario, envia o form com as informações (exceto imagem) e recebe o nome randonizado da imagem do usuario
  function SignUpFunc() {
      let url = `http://127.0.0.1:8000/users/register/`

      const formData = new FormData();
      formData.append("username", getUsername);
      formData.append("email", getEmail);
      formData.append("password", getPassword);
      formData.append("pwd", getpwd);
      formData.append("image", getImageUser.name);
      formData.append("question", getQuestion)
      formData.append("answer", getAnswer)

      const info = {method: 'POST', body: formData, 
        Headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      fetch(url, info)
      .then(async (res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          const data = await res.json();
          throw new Error(`${data.msg} status: ${res.status}`);
        }
      })
      
      .then((data) => {
        if (data.msg) {
          const tip = document.getElementById("SignTip")
          tip.innerText = data.msg
        } else {
          sendImageToCdn(data.filename)
          sessionStorage.setItem("token", data.token)
          router.push('/app')
        }
      })

      .catch((error) => {
        alert("Não foi possivel criar o usuario, tente novamente mais tarde")
        console.log(error.message);
      });
    }

  // Envia a imagem com o nome randonizado pelo back para o cdn
  function sendImageToCdn(filename) {
    const url = "http://127.0.0.1:8080/files/profile/"

    const formCdn = new FormData();
    formCdn.set('enctype', 'multipart/form-data');
    formCdn.append("image", getImageUser, filename)

    const requestData = {
      method: 'POST',
      body: formCdn
    }

    fetch(url, requestData)
    .then(res => {
      if (res.status === 200) {
        props.get_posts()
        closeModal()
        setPostFile()
      } else {
        throw new Error(`Não foi possivel salvar a imagem. status: ${res.status}`);
      }
    })

    .catch((error) => {
      console.log(error.message)
      alert("Não foi possivel salvar a imagem");
    });
  }

  useEffect(() => {
    checkLogin()
  }, [getToken]);


  return (
    <>
      <div className='page'>
        <div className="login-page">
          <div className='login-div' id='loginTab'>
            <p className='login-title'> Bem vindo de volta!</p>

            <div className='align-input'>
              <InputUser username={setUsername} valid={UserValid} setValid={setUserValid} tip='LoginTip'></InputUser>
              <InputPwd password={setPassword} valid={Pwd1Valid} setValid={setPwd1Valid} placeholder="Digite a senha" tip='LoginTip'></InputPwd>
            </div>

            <a className='login-tip' id='LoginTip'> </a>

            <button className='btn btn-login' onClick={checkIfLoginIsvalid}> Entrar </button>

            <p className='login-link' onClick={showLogin}> Cadastre-se </p>
            <p className='login-link' onClick={showRecovery}> Recuperar senha </p>
          </div>

          <div className='login-div' id='signupTab' style={{display: 'none'}}>
            <p className='login-title'> Junte-se a nós! </p>

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

            <a className='login-tip' id='SignTip'> </a>

            <button className='btn btn-login' onClick={checkIfSignIsValid}> Cadastrar </button>

            <p className='login-link' onClick={showLogin}> Entrar </p>
            <p className='login-link' onClick={showRecovery}> Recuperar senha </p>
          </div>
        </div>
      </div>
    </>
  )
}