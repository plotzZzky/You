
export default function PostCard(props) {

  return (
    <article>
      <div onClick={props.showModal}>
        <img src={props?.image} loading='lazy'></img>
      </div>
    </article>
  )
}