import { useState, useEffect } from 'react'
import PostCard from '../elements/postCard'
import AppNavBar from '../elements/appNavbar'
import ModalViewPost from '../elements/ModalViewPost';
import NewPost from '../elements/ModalNewPost';
import EditUser from '../elements/ModalEditUser';


export default function App() {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));
  const [Cards, setCards] = useState([]);
  const [modalData, setModalData] = useState({'user': '', 'comments': ''})

  // Verifica se possui o token 
  function check_login() {
    if (getToken == undefined) {
      location.pathname = "/login/";
    } else {
      get_posts();
    }
  }

  // Busca os posts no backend e executa a função que cria os cards
  function get_posts(value = 'Friends') {
    let url = "http://127.0.0.1:8000/posts/"
    const form = new FormData()
    form.append('type', value)

    let data = {
      method: 'POST',
      headers: { Authorization: 'Token ' + getToken },
      body: form
    }
    fetch(url, data)
      .then((res) => res.json())
      .then((data) => {
        create_cards(data['posts'])
      })
  }

  // Cria os cards das postagens 
  function create_cards(value) {
    setCards(
      value.map((data) => (
        <PostCard data={data} update={get_posts} get_info={() => get_modal_info(data.id)}></PostCard>
      )))
  }

  // Busca info(comentarios, likes etc) de um post 
  function get_modal_info(post_id) {
    let url = 'http://127.0.0.1:8000/posts/info/'
    let form = new FormData()
    form.append('id', post_id)

    let data = {
      method: 'POST',
      headers: { Authorization: 'Token ' + getToken },
      body: form
    }

    fetch(url, data)
      .then((res) => res.json())
      .then((data) => { 
        setModalData(data['post'])
      })
      .then(() => {
        change_visiblity_modal_divs()
      })
  }

  // Sempre que abrir o modal exibe a imagem e ocualt os comentarios
  function change_visiblity_modal_divs() {
    const modal = document.getElementById("PostModal")
    const modalVisibility = modal.style.display
    
    if (modalVisibility !== 'flex') {
    const img = document.getElementById("imgPrev")
    const div_comment = document.getElementById("commentPrev")

    modal.style.display = "flex"
    img.style.display = 'block';
    div_comment.style.display = 'none';
    }
  }

  useEffect(() => {
    check_login()
  }, [])

  return (
    <div className='page'>
      <AppNavBar get_posts={get_posts}></AppNavBar>

      <div className='app-page'>
        <div className="view-posts">
          {Cards}
        </div>
      </div>

      <EditUser></EditUser>

      <ModalViewPost data={modalData} update_posts={get_posts} update_modal={get_modal_info}></ModalViewPost>
      
      <NewPost get_posts={get_posts}></NewPost>
    </div>
  )
}