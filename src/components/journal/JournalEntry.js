import React from 'react'

const JournalEntry = () => {
    return (
        <div className="journal__entry">
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
                }}
            ></div>
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Buen dia
                </p>
                <p className="journal__entry-content">
                    Lorem ipsum dolor sit amet, oluptatem molestiae.
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>04</h4>
            </div>
            
        </div>
    )
}

export default JournalEntry
