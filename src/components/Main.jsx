import React from "react";
import "./Main.css";
import Markdown from "react-markdown";

const Main = ({ activeNote, onUpdateNote }) => {
  const onEditNote = (key, value) => {
    //changeした時の処理
    onUpdateNote({
      ...activeNote,
      // 動的key
      [key]: value,
      modDate: Date.now(),
    });
  };

  // activeNotesがfalseだった時の処理
  if (!activeNote) {
    return (
      <div className="noList">
        <div className="list">選択されていません。</div>
      </div>
    );
  }
  return (
    <div className="appMain">
      <div className="appMainNoteEdit">
        <input
          id="title"
          type="text"
          value={activeNote.title}
          onChange={(e) => onEditNote("title", e.target.value)}
        />
        <textarea
          id="content"
          value={activeNote.content}
          placeholder="備考欄"
          onChange={(e) => onEditNote("content", e.target.value)}
        ></textarea>
      </div>
      <div className="appMainNotePreview">
        <h1 className="previewTitle">{activeNote.title}</h1>
        <Markdown className="markdownPreview">{activeNote.content}</Markdown>
      </div>
    </div>
  );
};

export default Main;
