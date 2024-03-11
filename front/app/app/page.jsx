'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EditUser from '@comps/ModalEditUser';
import ModalViewPost from '@comps/ModalViewPost';
import NewPost from '@comps/ModalNewPost';
import PostCard from '@comps/postCard';
import AppNavBar from '../components/appNavbar';

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
    const url = "http://127.0.0.1:8000/post/all/"
    const form = new FormData()
    form.append('type', value)

    const data = {
      method: 'POST',
      headers: { Authorization: 'Token ' + getToken },
      body: form
    }
    fetch(url, data)
      .then((res) => res.json())
      .then((data) => {
        createCards(data)
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
    const url = `http://127.0.0.1:8000/post/${post_id}/`

    const data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken },
    }

    fetch(url, data)
      .then((res) => res.json())
      .then((data) => { 
        setModalData(data)
        console.log(data)
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
      <AppNavBar getPosts={recivePosts}></AppNavBar>

      <div className='app-page'>
        <div className="view-posts">
          {Cards}
        </div>
      </div>

      <EditUser></EditUser>

      <ModalViewPost data={modalData} updatePosts={recivePosts} updateModal={getModalInfo}></ModalViewPost>
      
      <NewPost get_posts={recivePosts}></NewPost>
    </div>
  )
}