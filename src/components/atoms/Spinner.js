import React from 'react'

const Spinner = () => {
    return (
        <div className='spinner-container'>
            <div className="lds-circle"><div></div></div>
            <p>Loading...</p>
        </div>
    )
}

export default Spinner
