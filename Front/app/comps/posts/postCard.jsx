
export default function PostCard(props) {
  const image = props?.image;

  return (
    <article>
      <div onClick={props.showPost}>
        <img src={image} loading='lazy'/>
      </div>
    </article>
  )
}