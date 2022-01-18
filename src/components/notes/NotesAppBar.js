import React from 'react'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';


const NotesAppBar = () => {
    const { active:note } = useSelector( state => state.notes );
    const dispatch = useDispatch();

    const notesBarDate = dayjs( note.date );
    
    const handleSave = () => {
        dispatch( startSaveNote( note ) );
               
    };

    const handleOnClickPicture = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleOnChangeFile = (e) => {
        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploading( file ) );
        }
    }


    return (
        <div className="notes__appbar">
            <span> { notesBarDate.format('DD/MMM/YYYY') }  </span>
            <input
                id='fileSelector' 
                type="file" 
                style={ { display: 'none' } }
                onChange={ handleOnChangeFile } 
                accept='image/*'

            />

            <div>
                <button 
                    className="btn"
                    onClick={ handleOnClickPicture }
                >
                    Picture
                </button>
            </div>
            
            <div>
                <button 
                    className="btn"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
            
        </div>
    )
}

export default NotesAppBar
