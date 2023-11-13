import { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import uuid from "react-uuid";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    // ローカルストレージに保存する
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "No Title",
      content: "This is the Content",
      modDate: Date.now(),
    };
    // 追加の記述
    setNotes([...notes, newNote]);
    console.log(notes);
  };

  // 削除機能
  const onDeleteNote = (id) => {
    // trueになっているものを残す(中の処理がtrueになる)
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  // activeになっているオブジェクトを取得
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const onUpdateNote = (updatedNote) => {
    //Main.jsxからと取ってきた引数
    // 修正された新しいノートの配列を返す
    const updateNotesArray = notes.map((note) => {
      // 選択されたnoteのidと順番のnoteのidが等しければupdateNoteの値をnotesに渡す
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });

    // notesに状態を預けることでsidebarの値が変わる
    setNotes(updateNotesArray);
  };

  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        notes={notes}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
