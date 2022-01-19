import React from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../actions/notes';
import Swal from 'sweetalert2';

const JournalEntry = ({ id, date, title, body, url }) => {

    const noteScreen = document.querySelector('#noteScreen');
    const { newEntry } = useSelector( state => state.ui );

    const noteDate = dayjs( date );
    const dispatch = useDispatch();
    
    const handleEntryNote = () => {
        if (newEntry) {
            Swal.fire('Finish your Note', 'Save your note to see other entry', 'info');
            
            
        } else{
            dispatch( activeNote( id, { date, title, body, url } ) );
            noteScreen.scrollIntoView({behavior: "smooth"});
        }
                
    }    
    
    return (
        <div className="journal__entry  animate__animated animate__fadeInLeft animate__faster" onClick={ handleEntryNote }>
            { ( url ) &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundImage: `url(${ url })`,
                        backgroundSize: 'cover',
                    }}
                ></div>
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                   { body }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd') }</span>
                <h4> { noteDate.date() } </h4>
            </div>
            
        </div>
    )
}

export default JournalEntry
