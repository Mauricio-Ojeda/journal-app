import React, { useRef } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import NotesAppBar from "./NotesAppBar";

const NoteScreen = () => {
  const dispatch = useDispatch();

  const { active: note } = useSelector((state) => state.notes);

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
          autofocus
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
    </div>
  );
};

export default NoteScreen;
