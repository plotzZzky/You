'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@comps/authContext';
import EditUser from '@comps/ModalEditUser';
import ModalViewPost from '@comps/ModalViewPost';
import NewPost from '@comps/ModalNewPost';
import PostCard from '@comps/postCard';
import AppNavBar from '@comps/appNavbar';


export default function App() {
  const [Token, setToken] = useAuth();
  const router = useRouter();
  const [Cards, setCards] = useState([]);
  const [modalData, setModalData] = useState();
  const [test, setTest] = useState();

  function checkLogin() {
    // Verifica se possui o token 
    if (Token !== null && typeof Token === 'string') {
      receiveAllPosts()
    } else {
      router.push("/login");
    }
  }

  function baseReceivePosts(url) {
    // Função base para buscar os posts no backend e executa a função que cria os cards
    const data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + Token },
    }

    fetch(url, data)
      .then((res) => res.json())
      .then((data) => {
        createCards(data)
      })
  }

  function receiveAllPosts() {
    // Função que busca os posts do followees(pessoas que voce segue)
    const url = "http://127.0.0.1:8000/posts/"
    baseReceivePosts(url)
  }

  function receiveFolloweePosts() {
    // Função que busca os posts do followees(pessoas que voce segue)
    const url = "http://127.0.0.1:8000/posts/followee/"
    baseReceivePosts(url)
  }

  function receiveUserPosts(user_id=0) {
    // Função que busca os posts do followees(pessoas que voce segue)
    const url = `http://127.0.0.1:8000/posts/user/${user_id}/`
    baseReceivePosts(url)
  }

  function createCards(value) {
    // Cria os cards das postagens 
    setCards(
      value.map((data, index) => (
        <PostCard key={index} data={data} update={receiveFolloweePosts} showModal={() => showModal(data.id)}></PostCard>
      )))
  }

  function showModal(value){
    setTest(value)
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <div className='page'>
      <AppNavBar recievePosts={baseReceivePosts} yourPosts={receiveUserPosts}></AppNavBar>

      <div className='app-page'>
        <div className="posts">
          {Cards}
        </div>
      </div>

      <EditUser></EditUser>

      <ModalViewPost data={modalData} updatePosts={receiveFolloweePosts} test={test} setTest={setTest}></ModalViewPost>
      
      <NewPost getPosts={receiveFolloweePosts}></NewPost>
    </div>
  )
}