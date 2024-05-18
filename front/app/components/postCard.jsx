
export default function PostCard(props) {

  return (
    <div className='card-margin'>
      <div className="card" onClick={props.showModal}>
        <img className="card-img" src={props.data?.image} loading='lazy'></img>
      </div>
    </div>
  )
}