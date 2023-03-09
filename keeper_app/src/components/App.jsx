import React, { useState } from "react";
import Header from "./Heading";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((preNotes) => {
      return [...preNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((preNotes) => {
      return preNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((eachNoteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={eachNoteItem.title}
            content={eachNoteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
