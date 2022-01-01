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
              src="https://us.123rf.com/450wm/noravector/noravector1901/noravector190100277/115431176-you-re-awesome-vector-illustrated-comic-book-style-phrase-on-abstract-background-.jpg?ver=6"
              alt="awesome"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteScreen;
