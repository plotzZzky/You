'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppNavBar from '../elements/appNavbar';
import EditUser from '../elements/ModalEditUser';
import ModalViewPost from '../elements/ModalViewPost';
import NewPost from '../elements/ModalNewPost';
import PostCard from '../elements/postCard';


export default function App() {
  const [getToken, setToken] = useState(typeof window !== 'undefined'? sessionStorage.getItem('token') : undefined);
  const router = useRouter();

  const [Cards, setCards] = useState([]);
  const [modalData, setModalData] = useState({'user': '', 'comments': ''})

  // Verifica se possui o token 
  function checkLogin() {
    if (getToken === '') {
      router.push("/login/");
    } else {
      recivePosts();
    }
  }

  // Busca os posts no backend e executa a função que cria os cards
  function recivePosts(value = 'Friends') {
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
        createCards(data['posts'])
      })
  }

  // Cria os cards das postagens 
  function createCards(value) {
    setCards(
      value.map((data, index) => (
        <PostCard key={index} data={data} update={recivePosts} get_info={() => getModalInfo(data.id)}></PostCard>
      )))
  }

  // Busca info(comentarios, likes etc) de um post 
  function getModalInfo(post_id) {
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
        changeVisiblityModalDivs()
      })
  }

  // Sempre que abrir o modal exibe a imagem e ocualt os comentarios
  function changeVisiblityModalDivs() {
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
    checkLogin()
  }, [])

  return (
    <div className='page'>
      <AppNavBar get_posts={recivePosts}></AppNavBar>

      <div className='app-page'>
        <div className="view-posts">
          {Cards}
        </div>
      </div>

      <EditUser></EditUser>

      <ModalViewPost data={modalData} update_posts={recivePosts} update_modal={getModalInfo}></ModalViewPost>
      
      <NewPost get_posts={recivePosts}></NewPost>
    </div>
  )
}