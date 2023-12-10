import { useState } from 'react';
import NavBar from './elements/navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import background_a from './media/background_a.jpg'
import background_b from './media/background_b.jpg'
import background_c from './media/background_c.jpg'


export default function Home() {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));

  const faq = [
    { "question": "O que é a rede social You?",
      "answer": "You é uma plataforma de rede social focada em compartilhar momentos significativos e relevantes da vida dos usuários. É um espaço para postar e valorizar o que realmente importa em suas vidas." },
    { "question": "Como faço para começar a usar o You?",
      "answer": "Para começar, basta criar uma conta gratuita no You. Depois de fazer login, você poderá começar a compartilhar os momentos importantes da sua vida através de postagens." },
    { "question": "Posso controlar quem vê minhas postagens no You?",
      "answer": "Sim, o You oferece opções de privacidade para controlar quem pode ver suas postagens. Você pode configurar suas postagens para serem públicas, visíveis apenas para seus amigos ou privadas, dependendo da sua preferência." },
    { "question": "Existe um limite para o número de postagens que posso fazer no You?",
      "answer": "Não há um limite específico para o número de postagens que você pode fazer no You. A plataforma incentiva a expressão livre e o compartilhamento dos momentos que são importantes para você." },
    { "question": "O You possui alguma versão premium ou planos pagos?",
      "answer": "Atualmente, o You oferece uma experiência completa gratuitamente para todos os usuários. No entanto, podem ser disponibilizados recursos premium no futuro, mas a maior parte da plataforma é e continuará sendo gratuita para todos." },
    { "question": "Como posso relatar problemas ou sugerir melhorias para o You?",
      "answer": "Se você encontrar problemas técnicos ou desejar sugerir melhorias para o You, entre em contato conosco através da seção de Suporte no site ou por meio dos canais de contato disponíveis na plataforma. Estamos sempre abertos a ouvir e melhorar." },
  ];

  const faqItems = () => {
    return faq.map((data) => (
      <details>
        <summary> {data.question} </summary>
        <p className='details-text'> {data.answer} </p>
      </details>
    ))
  }

  function go_login(){
    if (getToken == undefined) {
      location.pathname = "/login/"
    } else {
      location.pathname = "/app/"
    }
  }

  function go_github(){
    location.pathname = "https://github.com/plotzzzky"
  }

  return (
    <>
      <NavBar></NavBar>

      <div className='page-home'>
        <div className='align-home-page'>
          <div className='div-align-text-home'>
            <a className='big-title'> Bem vindo a  You!</a>
            <p className='subtitle'> A You é a plataforma para compartilhar o que importa na sua via com amigos, familiares e o mundo... </p>
            <br></br>
            <button className='btn' onClick={go_login}> Fazer parte!</button>
          </div>
          <img className='img-background' src={background_a} loading='lazy'></img>
        </div>

      </div>

      <div className='page-home'>
        <div className='align-home-page-midle'>
          <img className='img-background' src={background_b} loading='lazy'></img>
          <div className='div-align-text-home'>
            <p className='title'> Aqui você pode... </p>
            <a className='home-text'>A You é uma plataforma para compartilhamento de fotos, é ideal para quem quer compartilhar suas experiências com o mundo. Aqui você pode criar uma galeria pessoal, seguir amigos e descobrir novas tendências e temas que são importantes para você. Com a You, você nunca perde um momento importante e pode reviver suas lembranças sempre que quiser.</a>
            <p className='home-text'>Junte-se à comunidade You hoje mesmo!</p>
          </div>
        </div>
      </div>

      <div className='page-home'>
        <div className='align-home-page'>
          <div className='div-align-text-home'>
            <a className='title'> Sobre... </a>
            <p className='home-text'> Rede social inspirada no instagram para postar o que importa na sua via!</p>
            <p className='home-text'> Front end feito com <a href='https://react.dev/'>Reactjs</a> e <a href='https://vitejs.dev/'>Vite</a></p>
            <p className='home-text'> Back end feito com <a href='https://www.djangoproject.com/'>Django</a> e <a href='https://www.postgresql.org/'>PostgreSql</a></p>
          </div>

          <img className='img-background' src={background_c} loading='lazy'></img>
        </div>
      </div>

      <div className='page' id='Faq'>
        <p className='title'> Duvias frequentes: </p>
        {faqItems()}
      </div>

      <footer id="footer">
        <p className="link" onClick={go_github}>
          <FontAwesomeIcon icon={faGithub} />
          <a> GitHub </a>
        </p>

      </footer>
    </>
  )
}
