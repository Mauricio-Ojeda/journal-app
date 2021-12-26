import React from 'react';
import dayjs from 'dayjs';

const JournalEntry = ({ id, date, title, body, url }) => {

    const noteDate = dayjs( date );
    console.log(noteDate);

    return (
        <div className="journal__entry">
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
