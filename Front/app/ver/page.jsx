'use client'
import { useEffect, useState } from 'react';
import { useAuth } from '@comps/authContext';
import { useApi } from '@hooks/useApi';
import { useGenericGoPage } from '@hooks/useGoPage';
import PostCard from '@comps/posts/postCard';
import AppBar from '@comps/appBar';
import NewPostModal from '@/app/comps/posts/newPostModal';
import ViewPostModal from '@/app/comps/posts/viewPostModal';
import ProfileCard from '@posts/profileCard';
import './page.css';


export default function ViewPage() {
  const { isAuthenticated, loading } = useAuth();
  const goFrontPage = useGenericGoPage();
  const fetchApi = useApi();

  const [cardsPage, setCardsPage] = useState();
  const [showNewPost, setShowNewPost] = useState(false);

  const [showViewPost, setShowViewPost] = useState(false);
  const [viewPostData, setViewPostData] = useState([]);

  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    if (loading) return; // Não busca os cards até terminar a consulta do token em "back/me/"

    if (!isAuthenticated) { 
      goFrontPage("AUTH"); // Se não tiver token envia para pagina de login
    };

    showFolloweePosts();
  }, [loading])

  useEffect(() => {
    // Exibe o new post modal se receber os dados
    setShowViewPost(viewPostData.image? true : false); // se tiver a imagem exibe o modal

  }, [viewPostData])

  function showNewPostModal(){
    /**
     * Exibe o modal para criar um novo post
     */
    setShowNewPost(true);
  };

  async function showFolloweePosts() {
    // Exibe os posts das pessoas que o usuario segue e do usuario
    setProfileData({}); // Escinde o card do perfil do usario

    const response = await fetchApi("users/", true);
    
    if (response) {
      createCards(response);
    }
  };

  async function showAllPosts() {
    // Exibe o horizonte (posts de pessoas desconhecidas)
    setProfileData({}); // Escinde o card do perfil do usario

    const response = await fetchApi("posts/", true);

    if (response) {
      createCards(response);
    }
  };

  async function showProfilePage(profileID) {
    // Exibe o perfil do usuario e os seus posts
    const url = `users/${profileID}/`;  // 0 retorna os posts do usuario atual
    const response = await fetchApi(url, true);

    if (response) {
      createCards(response.posts);
      setProfileData(response.user);
    }
  };

  async function receiveViewPostModalData(postId) {
    // Busca informações de um post para ser exibido no viewpost modal
    const url = `posts/${postId}/`;
    const response = await fetchApi(url, true);
    setViewPostData(response); // Salva as informações no useState e aciona o useEffect 
  };

  function createCards(value) {
    // Cria os cards da pagina
    if (value.length > 0 && typeof value === 'object') {
      setCardsPage(
        value.map(({image, id}, index) => (
          <PostCard
            key={index}
            image={image}
            id={id}
            showPost={receiveViewPostModalData}
          />
      )))
    }
  };

  const PROFILE_PAGE = () => {
    return profileData.username? (
      <ProfileCard 
        username={profileData.username}
        itsMe={profileData.me}
        picture={profileData.picture}
        desc={profileData.desc}
        followers={profileData.followers}
      />
    ) : null
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
            {PROFILE_PAGE()}

            {cardsPage || <h3>Carregando...</h3>}

          </div>
        </section>

        <NewPostModal 
          showNewPost={showNewPost} 
          setShowNewPost={setShowNewPost} 
          showFolloweePosts={showFolloweePosts} 
        />

        <ViewPostModal
          showViewPost={showViewPost} 
          setShowViewPost={setShowViewPost}
          modalData={viewPostData}
          receiveViewPostModalData={receiveViewPostModalData}
          update={showFolloweePosts}
          showProfile={showProfilePage}
        />
      </>
    )
  }
}