import { useState } from "react";

export default function NewPost(props) {
    const [getToken, setToken] = useState(sessionStorage.getItem('token'));

    const [postText, setPostText] = useState("");
    const [postImg, setPostImg] = useState();
    const [postFile, setPostFile] = useState();

    function click_input() {
        document.getElementById("selectImg").click()
    }

    function close_modal() {
        let modal = document.getElementById("NewPostModal");
        modal.style.display = 'none'
        document.body.style.position = ''
    }

    function change_image(event) {
        const file = event.target.files[0];
        setPostImg(file)
        const reader = new FileReader();
    
        reader.onload = function(event) {
            setPostFile(event.target.result)};
        reader.readAsDataURL(file);
    }

    function save_post() {
        let url = "http://127.0.0.1:8000/posts/add/"
  
        const formData = new FormData();
        formData.set('enctype', 'multipart/form-data');
        formData.append("text", postText);
        formData.append('image', postImg, postImg.name);
  
        let info = {method: 'POST',
                    headers: {Authorization: 'Token '+ getToken},
                    body: formData}

        fetch(url, info)
        .then(() => {
            props.update()
            setPostImg()
            setPostFile()
            setPostText("")
            close_modal()
            props.update_posts()
        })
    }

    return (
        <div className="modal-background" id="NewPostModal" onClick={close_modal}>
            <div className='modal-new' onClick={e => e.stopPropagation()}>
                <img className='img-preview' onClick={click_input} src={postFile}></img>
                <input type="file" className="select-image" id='selectImg' onChange={change_image}></input>
                <input type="text" placeholder="Diga algo" className="input-text-desc" value={postText} onChange={(e) => setPostText(e.target.value)}></input>
                <input type="submit" className="newpost-btn" value="Publicar" onClick={save_post}></input>
            </div>
        </div>
    )
}