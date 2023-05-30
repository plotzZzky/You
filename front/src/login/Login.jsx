import { useState, useEffect } from 'react';

import NavBar from "../elements/navbar";
import InputPwd from '../elements/inputs/inputPwd';
import InputEmail from '../elements/inputs/inputEmail';
import InputUser from '../elements/inputs/inputUser';


export default function Login() {
  const [getLogin, setLogin] = useState(true);
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));

  const [getUsername, setUsername] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getPassword1, setPassword1] = useState("");
  const [getPassword2, setPassword2] = useState("")
  const [getImage, setImage] = useState();
  const [getFile, setFile] = useState();

  //Validate
  const [UserValid, setUserValid] = useState(false);
  const [EmailValid, setEmailValid] = useState(false);
  const [Pwd1Valid, setPwd1Valid] = useState(false);
  const [Pwd2Valid, setPwd2Valid] = useState(false)

  function check_login() {
    if (getToken != undefined) {
      location.href = "/you/app/";
    }
  }

  function show_login() {
    let login = document.getElementById('loginTab');
    let signup = document.getElementById('signupTab');
    login.style.display = getLogin ? 'none' : 'block'
    signup.style.display = getLogin ? 'block' : 'none'
    setLogin(getLogin ? false : true)
  }

  function check_if_login_valid() {
    if (Pwd1Valid && UserValid) {
      loginFunc()
    } else {
      const tip = document.getElementById("LoginTip")
      tip.innerText = "Prencha os dados de login"
    }
  }

  function loginFunc() {
    let url = `http://127.0.0.1:8000/users/login/`

    const formData = new FormData();
    formData.append("username", getUsername)
    formData.append("password", getPassword1)
    let info = {
      method: 'POST',
      body: formData
    }

    fetch(url, info)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          const tip = document.getElementById("LoginTip")
          tip.innerText = data.error
        } else {
          sessionStorage.setItem("token", data["token"])
          setToken(sessionStorage.getItem("token"))
        }
      })
  }

  function check_if_sign_valid() {
    if (UserValid && EmailValid && Pwd1Valid && Pwd2Valid && Pwd1Valid === Pwd2Valid) {
      SignUpFunc()
    } else {
      const tip = document.getElementById("SignTip")
      tip.innerText = "Prencha os dados para se registar"
    }
  }

  function SignUpFunc() {
    let url = `http://127.0.0.1:8000/users/register/`

    const formData = new FormData();
    formData.set('enctype', 'multipart/form-data');
    formData.append("username", getUsername);
    formData.append("email", getEmail)
    formData.append("password1", getPassword1)
    formData.append("password2", getPassword2)
    formData.append('image', getImage, getImage.name);

    let info = { method: 'POST', body: formData }

    fetch(url, info)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          const tip = document.getElementById("SignTip")
          tip.innerText = data.error
        } else {
          sessionStorage.setItem("token", data["token"])
          setToken(sessionStorage.getItem("token"))
        }
      })
  }

  function click_input() {
    const input = document.getElementById("selectImg").click()
  }

  function change_image(event) {
    const file = event.target.files[0];
    setImage(file)
    const reader = new FileReader();

    reader.onload = function (event) {
      setFile(event.target.result);
    };

    reader.readAsDataURL(file);
  }

  useEffect(() => {
    check_login()
  }, [getToken]);


  return (
    <>
      <NavBar></NavBar>

      <div className="page" style={{ paddingTop: '6em' }}>
        <div className='login-div' id='loginTab'>
          <p className='login-title'> Bem vindo de volta!</p>

          <div className='align-input'>
            <InputUser username={setUsername} valid={UserValid} setValid={setUserValid} tip='LoginTip'></InputUser>
            <InputPwd password={setPassword1} valid={Pwd1Valid} setValid={setPwd1Valid} placeholder="Digite a senha" tip='LoginTip'></InputPwd><br />
            <a className='login-tip' id='LoginTip'> </a>
          </div>
          <button className='btn' onClick={check_if_login_valid}> Entrar </button>

          <p className='login-text-link' onClick={show_login}> Cadastre-se</p>
        </div>

        <div className='login-div' id='signupTab' style={{ display: 'none' }}>
          <p className='login-title'> Junte-se a You! </p>

          <div className='align-input'>
            <div>
              <img className='img-user-preview' onClick={click_input} src={getFile}></img>
              <input type="file" className="select-image" id='selectImg' onChange={change_image}></input>
            </div>

            <InputUser username={setUsername} valid={UserValid} setValid={setUserValid} tip='SignTip'></InputUser>
            <InputEmail email={setEmail} valid={EmailValid} setValid={setEmailValid} tip='SignTip'></InputEmail>
            <InputPwd password={setPassword1} valid={Pwd1Valid} setValid={setPwd1Valid} placeholder="Digite a senha" tip='SignTip'></InputPwd>
            <InputPwd password={setPassword2} valid={Pwd2Valid} setValid={setPwd2Valid} placeholder="Comfirme a senha" tip='SignTip'></InputPwd><br />
            <a className='login-tip' id='SignTip'> </a>
          </div>

          <button className='btn' onClick={check_if_sign_valid}> Cadastrar </button>

          <p className='login-text-link' onClick={show_login}> Entrar</p>
        </div>
      </div>
    </>

  )
}