'use client'
import { useEffect, useState } from 'react';
import { useAuth } from '@comps/authContext';
import { useApi } from '@hooks/useApi';
import { useGenericGoPage } from '@hooks/useGoPage';
import PostCard from '@comps/postCard';
import AppBar from '@comps/appBar';
import NewPostModal from '@comps/modalNewPost';
import ViewPostModal from '@comps/ModalViewPost';
import './page.css'


export default function ViewPage() {
  const { isAuthenticated } = useAuth();
  const goPage = useGenericGoPage();
  const requestApi = useApi();

  const [cardsPage, setCardsPage] = useState();
  const [showNewPost, setShowNewPost] = useState(false);

  const [showViewPost, setShowViewPost] = useState(false);
  const [viewPostData, setViewPostData] = useState([]);

  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {  // Verifica se possui o token 
      goPage("AUTH");
    } 

    showFolloweePosts();
  }, [])

  function showNewPostModal(){
    setShowNewPost(true);
  };

  async function showFolloweePosts() {
    const response = await requestApi("USERS", true);
    createCards(response);
  }

  async function showAllPosts() {
    const response = await requestApi("POSTS", true);
    createCards(response);
  }

  async function showProfilePage() {
    setShowProfile(true);
  }

  function showViewPostModal() {
    setShowViewPost(true);
  }

  function createCards(value) {
    // Cria os cards da pagina
    if (value) {
      setCardsPage(
        value.map(({image, id}, index) => (
          <PostCard
            key={index}
            image={image}
            update={showFolloweePosts}
            showPost={() => getModalData(id)}
          />
        ))
      )
    }
  };

  async function getModalData(postId) {
    // Busca informações de um post

    showViewPostModal();
  }

  if (isAuthenticated) {
    return (
      <>
        <AppBar
          showNewPostModal={showNewPostModal}
          showFolloweePosts={showFolloweePosts}
          showAllPosts={showAllPosts}
          showProfilePage={showProfilePage}
        />

        <section>
          <div id='Cards'>
            {cardsPage || <h3>Carregando...</h3>}
          </div>
        </section>

        <NewPostModal showNewPost={showNewPost} setShowNewPost={setShowNewPost} />
        <ViewPostModal showViewPost={showViewPost} setShowViewPost={setShowViewPost} modalData={viewPostData} />
      </>
    )
  }
}