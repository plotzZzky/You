'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@comps/authContext';
import { useApi } from '@comps/hooks/useApi';
import PostCard from '@comps/postCard';
import AppBar from '@comps/appBar';
import Profile from '@comps/profile';


export default function ViewPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const requestApi = useApi();

  const [cardsPage, setCardsPage] = useState();
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  useEffect(() => {
    //checkIsAuthenticated()
  }, [])

  function checkIsAuthenticated() {
    if (isAuthenticated) {  // Verifica se possui o token 
      createFolloweePage();

    } else {
      router.push("/auth");
    }
  };

  function showModal(value){
    setModalId(value)
  }

  async function createFolloweePage() {
    const response = await requestApi("FOLLOWEE", true);
    createCards(response);
  }

  async function createAllPostsPage() {
    const response = await requestApi("POSTS", true);
    createCards(response);
  }

  function createCards(data) {
    // Cria os cards da pagina
    setCardsPage(
      <div id='Cards'>
        {data.map(({image, id}, index) => (
          <PostCard
            key={index}
            image={image}
            update={createFolloweePage}
            showModal={() => showModal(id)}
          />
        ))}
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        <AppBar />

        <section>
          {cardsPage}
        </section>
      </>
    )
  }
}