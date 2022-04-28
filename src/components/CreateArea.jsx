import React, { useState, useEffect, useRef } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [expand, setExpand] = useState(false)
  const ref = useRef()
  function handleExpand(e){
    if(!ref.current.contains(e.target)){
      setExpand(false);
    }
    
  }

  useEffect(() =>{
    document.addEventListener('click', handleExpand, true);
    return ()=>{document.removeEventListener('click', handleExpand, true)}
  })

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div >
      <form ref={ref} className='create-note'>
        {expand ? <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />:null}
        <textarea 
          ref={ref}
          name="content"
          onChange={handleChange}
          onClick={()=>setExpand(true)}
          value={note.content}
          placeholder="Take a note..."
          rows={expand? '3':'1'}
        />
        <Zoom in={expand}>
          <Fab onClick={submitNote}>
            <AddIcon/>
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
