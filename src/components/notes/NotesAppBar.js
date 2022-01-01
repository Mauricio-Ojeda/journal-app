import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote } from '../../actions/notes';

const NotesAppBar = () => {
    const { active:note } = useSelector( state => state.notes );
    const dispatch = useDispatch();
    const handleSave = () => {
        dispatch( startSaveNote( note ) );
        console.log(note)
    }

    return (
        <div className="notes__appbar">
            <span> 4 de Diciembre del 2021</span>

            <div>
                <button className="btn">
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
