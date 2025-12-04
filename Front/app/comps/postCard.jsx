
export default function PostCard(props) {

  return (
    <article>
      <div onClick={props.showPost}>
        <img src={props?.image} loading='lazy'></img>
      </div>
    </article>
  )
}