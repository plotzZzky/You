'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@comps/authContext';
import EditUser from '@comps/ModalEditUser';
import ModalViewPost from '@comps/ModalViewPost';
import NewPost from '@comps/ModalNewPost';
import PostCard from '@comps/postCard';
import AppNavBar from '@comps/appNavbar';
import Profile from '@comps/profile';


export default function App() {
  const [Token, setToken] = useAuth();
  const router = useRouter();
  const [cardsPage, setCardsPage] = useState();
  const [modalId, setModalId] = useState();

  function checkLogin() {
    // Verifica se possui o token 
    if (Token !== null && typeof Token === 'string') {
      createFolloweePage()
    } else {
      router.push("/login");
    }
  }

  function showModal(value){
    setModalId(value)
  }

  function createFolloweePage() {
    // Cria a pagina com os posts dos followee
    const url = "http://127.0.0.1:8000/posts/followee/"
    baseReceivePosts(url).then((data) => {
      createCards(data, null)
    })
  }

  function createAllPostsPage() {
    // Cria a pagina com todos os posts
    const url = "http://127.0.0.1:8000/posts/"
    baseReceivePosts(url).then((data) => {
      createCards(data, null)
    })
  }

  function createProfilePage(userId=0) {
    // Cria a pagina do perfil de um usuario
    const url = `http://127.0.0.1:8000/posts/user/${userId}/`
    baseReceivePosts(url).then((data) => {
      createCards(data.posts, data.user)
    })
  }

  async function baseReceivePosts(url) {
    // Função base para buscar os posts no backend
    const data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + Token },
    }

    const res = await fetch(url, data);
    return await res.json();
  }

  function createCards(data, userData) {
    // Cria os cards da pagina
    setCardsPage(
      <div className="posts">
        {userData? <Profile data={userData} ></Profile> : null}

        {data.map((data, index) => (
          <PostCard key={index} data={data} update={createFolloweePage} showModal={() => showModal(data.id)}></PostCard>
        ))}
      </div>
    )
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <div className='page'>
      <AppNavBar followeePage={createFolloweePage} allPostsPage={createAllPostsPage} profilePage={createProfilePage} ></AppNavBar>

      {cardsPage}

      <EditUser></EditUser>

      <ModalViewPost updatePosts={createFolloweePage} modalId={modalId} setModalId={setModalId} showProfile={createProfilePage}></ModalViewPost>
      
      <NewPost getPosts={createFolloweePage}></NewPost>
    </div>
  )
}