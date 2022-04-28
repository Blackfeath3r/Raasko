import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";


function App() {
  const [notes, setNotes] = useState([]);


  useEffect(()=>{
    axios.get("https://raaskoapi.herokuapp.com/notes").then(res => setNotes(res.data))
  },[])

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    axios.post("https://raaskoapi.herokuapp.com/notes",newNote).then(res => console.log(res.data))

  }

  function deleteNote(id, dbid) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
    axios.delete(`https://raaskoapi.herokuapp.com/notes/${dbid}`).then((res) => console.log("deleted object:",res.data))
    
  }

  

  return (
    <div >
      <Header />
      <CreateArea onAdd={addNote}/>
      {notes.map((noteItem, index) => {
        return (
          <Note
            dbid={noteItem._id}
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
