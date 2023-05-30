import { useState, useEffect } from 'react'
import PostCard from '../elements/postCard'
import AppNavBar from '../elements/appNavbar'
import Modal from '../elements/Modal';
import NewPost from '../elements/NewPost';
import EditUser from '../elements/editUser';


export default function App() {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));
  const [getModal, setModal] = useState();
  const [Cards, setCards] = useState();
  const [getTab, setTab] = useState();

  function check_login() {
    if (getToken == undefined) {
      location.href = "/you/login/";
    } else {
      get_friends_posts();
    }
  }

  function check_tab() {
    switch (getTab) {
      case 'all':
        get_all_posts()
        break;
      case 'your':
        get_your_posts()
        break;
      default:
        get_friends_posts()
        break;
    }
  }

  function get_friends_posts() {
    let url = "http://127.0.0.1:8000/posts/"
    let data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken }
    }
    fetch(url, data)
      .then((res) => res.json())
      .then((data) => {
        create_cards(data, false)
        setTab('friends')
      })
  }

  function get_all_posts() {
    let url = "http://127.0.0.1:8000/posts/all/"
    let data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken }
    }
    fetch(url, data)
      .then((res) => res.json())
      .then((data) => {
        create_cards(data, true)
        setTab('all')
      })
  }

  function get_your_posts() {
    let url = "http://127.0.0.1:8000/posts/your/"
    let data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken }
    }
    fetch(url, data)
      .then((res) => res.json())
      .then((data) => {
        create_cards(data, true)
        setTab('your')
      })
  }

  function create_cards(data, horizon) {
    const posts = data['posts']
    setCards(
      posts?.map((data) => (
        <PostCard data={data} horizon={horizon} update={get_modal_info} open={() => show_modal(data)}></PostCard>
      )))
  }

  function show_modal(data) {
    let modal = document.getElementById("Modal")
    modal.style.display = "block"
    document.body.style.position = 'fixed'
    get_modal_info(data.id)
  }

  function get_modal_info(post_id) {
    let url = `http://127.0.0.1:8000/posts/info/id=${post_id}/`
    let header = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken }
    }
    fetch(url, header)
      .then((res) => res.json())
      .then((data) => {
        setModal(data['post'])
      })
  }

  function show_new_post() {
    const newModal = document.getElementById("NewPostModal")
    newModal.style.display = "block"
  }

  useEffect(() => {
    check_login()
  }, [])


  return (
    <>
      <AppNavBar new={show_new_post} all={get_all_posts} your={get_your_posts} friends={get_friends_posts}></AppNavBar>

      <div className='app-page' id='postsView'>
        <div className="view-posts">
          {Cards}
        </div>
      </div>

      <div className='app-page' id='horizonView' style={{ display: 'none' }}>
        <div className="view-posts">
          {Cards}
        </div>
      </div>

      <div className='app-page' id='yourView' style={{ display: 'none' }}>
        <div className="view-posts">
          {Cards}
        </div>
      </div>

      <EditUser></EditUser>
      <Modal data={getModal} update_info={get_modal_info} update_posts={check_tab}></Modal>
      <NewPost update={get_modal_info} update_posts={check_tab}></NewPost>
    </>
  )
}