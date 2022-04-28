import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
  function handleClick() {
    props.onDelete(props.id, props.dbid);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
        <DeleteIcon className='delete-icon' onClick={handleClick}/>
    </div>
  );
}

export default Note;
