import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

const NotesAppBar = () => {
    const { active:note } = useSelector( state => state.notes );
    const dispatch = useDispatch();
    
    const handleSave = () => {
        dispatch( startSaveNote( note ) );
        console.log(note)
    };

    const handleOnClickPicture = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleOnChangeFile = (e) => {
        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploading( file ) );
            console.log('onChange file')
        }
    }


    return (
        <div className="notes__appbar">
            <span> 4 de Diciembre del 2021</span>

            <input
                id='fileSelector' 
                type="file" 
                style={ { display: 'none' } }
                onChange={ handleOnChangeFile } 

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
