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
  const { isAuthenticated, loading, checkAuthStatus } = useAuth();
  const goFrontPage = useGenericGoPage();
  const fetchApi = useApi();

  const [cardsList, setCardsList] = useState();
  const [showNewPost, setShowNewPost] = useState(false);

  const [showViewPost, setShowViewPost] = useState(false);
  const [viewPostData, setViewPostData] = useState([]);

  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) { 
      goFrontPage("AUTH"); // Se não tiver token envia para pagina de login
    };

    showFolloweePosts();
  }, [isAuthenticated, loading])

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
    setProfileData({}); // Esconde o card do perfil do usario
    checkAuthStatus();

    const response = await fetchApi("users/", true);
    
    if (response) {
      createCards(response);
    }
  };

  async function showAllPosts() {
    // Exibe o horizonte (posts de pessoas desconhecidas)
    setProfileData({}); // Escinde o card do perfil do usario
    checkAuthStatus();

    const response = await fetchApi("posts/", true);

    if (response) {
      createCards(response);
    }
  };

  async function showProfilePage(profileID) {
    // Exibe o perfil do usuario e os seus posts
    checkAuthStatus();

    const url = `users/${profileID}/`;  // 0 retorna os posts do usuario atual
    const response = await fetchApi(url, true);

    if (response) {
      createCards(response.posts);
      setProfileData(response.user);
    }
  };

  async function receiveViewPostModalData(postId) {
    // Busca informações de um post para ser exibido no viewpost modal
    checkAuthStatus();
    const url = `posts/${postId}/`;
    const response = await fetchApi(url, true);
    setViewPostData(response); // Salva as informações no useState e aciona o useEffect 
  };

  function createCards(value) {
    // Cria os cards da pagina
    if (value.length > 0 && typeof value === 'object') {
      setCardsList(
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
        id={profileData.id}
        picture={profileData.picture}
        username={profileData.username}
        itsMe={profileData.me}
        desc={profileData.desc}
        followers={profileData.followers}
        followed={profileData.followed}
        question={profileData.question}
      />
    ) : null
  }

  const CARDS_PAGE = () => {
    if (loading) {
      return (
        <h3 style={{textAlign: 'center', margin: '4vh auto'}}> Carregando... </h3>
      )
    };

    return cardsList == undefined? (
      <>
        <h3 style={{textAlign: 'center', margin: '4vh auto'}}> Crie posts ou siga usuários para ver conteúdos... </h3>
      </>
    ): (
      cardsList
    )
  };

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

            {CARDS_PAGE()}

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