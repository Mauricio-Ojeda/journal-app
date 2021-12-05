import React from 'react'
import NotesAppBar from './NotesAppBar'

const NoteScreen = () => {
    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text" 
                    placeholder="Write your awesome title" 
                    className="notes__title-input"
                    name="" 
                    id="" 

                />
                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                ></textarea>
                <div className="notes__image">
                    <img 
                        src="https://us.123rf.com/450wm/noravector/noravector1901/noravector190100277/115431176-you-re-awesome-vector-illustrated-comic-book-style-phrase-on-abstract-background-.jpg?ver=6" 
                        alt="awesome" 

                    />
                </div>

            </div>
            
        </div>
    )
}

export default NoteScreen
