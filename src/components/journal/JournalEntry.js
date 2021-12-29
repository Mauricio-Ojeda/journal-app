import React from 'react';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

const JournalEntry = ({ id, date, title, body, url }) => {

    const noteDate = dayjs( date );
    const dispatch = useDispatch();
    
    const handleEntryNote = () => {
        dispatch( activeNote( id, { date, title, body, url } ) )
    }    

    return (
        <div className="journal__entry" onClick={ handleEntryNote }>
            { ( url ) &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `${ url }`,
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
