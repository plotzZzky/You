'use client'
import { useEffect, useState } from 'react';
import { useAuth } from '@comps/authContext';
import { useApi } from '@comps/hooks/useApi';
import { useGenericGoPage } from '@hooks/useGoPage';
import PostCard from '@comps/postCard';
import AppBar from '@comps/appBar';


export default function ViewPage() {
  const { isAuthenticated } = useAuth();
  const goPage = useGenericGoPage();
  const requestApi = useApi();

  const [cardsPage, setCardsPage] = useState();
  const [showNewPost, setShowNewPost] = useState(false);
  const [showViewPostModal, setShowViewPostModal] = useState(false);

  useEffect(() => {
    checkIsAuthenticated()
  }, [])

  function checkIsAuthenticated() {
    if (isAuthenticated) {  // Verifica se possui o token 
      showFolloweePosts();

    } else {
      goPage("AUTH");
    }
  };

  function showNewPostModal(){
    setShowNewPost(true);
  };

  function showViewPostModal() {
    setShowViewPostModal(true);
  }

  async function showFolloweePosts() {
    const response = await requestApi("FOLLOWEE", true);
    createCards(response);
  }

  async function showAllPosts() {
    const response = await requestApi("POSTS", true);
    createCards(response);
  }

  async function showProfilePage() {
    return;
  }

  function createCards(data) {
    // Cria os cards da pagina
    setCardsPage(
      data.map(({image, id}, index) => (
        <PostCard
          key={index}
          image={image}
          update={showFolloweePosts}
          showModal={() => showModal(id)}
        />
      ))
    )
  };

  if (isAuthenticated) {
    return (
      <>
        <AppBar
          showNewPostModal={showNewPostModal}
          showAllPosts={showAllPosts}
          showFolloweePosts={showFolloweePosts}
          showProfilePage={showProfilePage}
        />

        <section>
          <div id='Cards'>
            {cardsPage}
          </div>
        </section>
      </>
    )
  }
}