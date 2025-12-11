
export default function PostCard(props) {
  const image = props?.image;

  function showThisPostOnModal() {
    props.showPost(props.id);
  }

  return (
    <article>
      <div onClick={showThisPostOnModal}>
        <img className="card-img" src={image} loading='lazy'/>
      </div>
    </article>
  )
}