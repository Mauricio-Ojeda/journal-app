import React, { useRef } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeNote, startDeleteNote } from "../../actions/notes";
import { finishNewEntry } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";
import NotesAppBar from "./NotesAppBar";

const NoteScreen = () => {
  const dispatch = useDispatch();

  const { active: note } = useSelector((state) => state.notes);
  const { newEntry } = useSelector((state) => state.ui);

  const [values, handleInputChange, reset] = useForm(note);

  const activeId = useRef(note.id);

  //destructuring
  const { title, body } = values;

  useEffect(() => {
    if (activeId.current !== note.id) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(values.id, { ...values }));
  }, [values, dispatch]);

  const handleDelete = () => {
    dispatch( startDeleteNote( activeId ) )
    if (newEntry) {
      dispatch( finishNewEntry() );      
    }
  }

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Write your awesome title"
          className="notes__title-input"
          name="title"
          id="title"
          value={title}
          onChange={handleInputChange}
          autoFocus
        />
        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          name="body"
          id="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>
        {note.url && (
          <div className="notes__image">
            <img
              src={note.url}
              alt={title}
            />
          </div>
        )}
      </div>
      <button 
        className="btn btn-danger"
        onClick={ handleDelete }
      > 
        Delete 
      </button>
    </div>
  );
};

export default NoteScreen;
