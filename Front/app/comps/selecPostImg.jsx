
export default function SelectPostImg(props) {
  
  function clickInput() {
    // Ao clickar na imagem aciona o input
    document.getElementById('selectImgUser').click();
  };

  function changeImage(event) {
    const file = event.target.files[0];
    props.setPostImg(file);
    const reader = new FileReader();

    reader.onload = function (event) {
      props.setPostFile(event.target.result)
    }
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <img onClick={clickInput} src={props.postFile} />
      <input type="file" id='selectImgUser' onChange={changeImage} />
    </div>
  )   
} 