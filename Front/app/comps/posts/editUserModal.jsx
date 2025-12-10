export default function EditUserModal(props) {


  if (props.showEditUserModal) {
    return (
      <div id="EditUserModal" onClick={props.showEditUserModalFunc}>
          <div className='modal' onClick={e => e.stopPropagation()}>

          </div>
      </div>
    )
  }
}