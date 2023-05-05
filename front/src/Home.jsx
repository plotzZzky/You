import { useState } from 'react';
import NavBar from './elements/navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import background_a from './media/background_a.jpg'
import background_b from './media/background_b.jpg'
import background_c from './media/background_c.jpg'

library.add(faGithub )


export default function Home() {
    const [getToken, setToken] = useState(sessionStorage.getItem('token'));

    function to_login() {
        location.href = "/you/login/"
    }

    function to_notes() {
        if (getToken == undefined) {
            location.href = "/you/login/"
        } else {
            location.href = "/you/notes/"
        }
    }

    return (
        <>
            <NavBar></NavBar>

            <div className='page-home'>
                <div className='align-home-page'>
                    <div className='div-align-text-home'>
                        <a className='big-title'> Bem vindo a  You!</a>
                        <p className='subtitle'> A You é a plataforma para compartilhar suas fotos com seus amigos, familiares e o mundo... </p>
                        <br></br>
                        <button className='btn' onClick={to_login}> Fazer parte!</button>
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
                        <p className='subtitle'> Rede social inspirada no instagram para postar imagens</p>
                        <p className='subtitle'> Front end feito com <a href='https://react.dev/'>Reactjs</a> e <a href='https://vitejs.dev/'>Vite</a></p>
                        <p className='subtitle'> Back end feito com <a href='https://www.djangoproject.com/'>Django</a> e <a href='https://www.postgresql.org/'>PostgreSql</a></p>
                    </div>

                    <img className='img-background' src={background_c} loading='lazy'></img>
                </div>
            </div>

            <footer>
                <a href='https://www.github.com/plotzzzky'> Dev: Plotzky <FontAwesomeIcon icon="fa-brands fa-github" /></a>
            </footer>
        </>
  )
}
