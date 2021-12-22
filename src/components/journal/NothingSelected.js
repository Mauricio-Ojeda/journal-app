import React from 'react'
import { useSelector } from 'react-redux';
import Spinner from '../atoms/Spinner';

const NothingSelected = () => {

    const { loading } = useSelector( state => state.ui );

    return (
        <div >

            { loading ? <div className="nothing__main-content"> <Spinner /> </div>
                : (
                    <div className='nothing__main-content'>

                        <p>
                            Select something
                            <br />
                            create an entry
                        </p>
                            <i className="far fa-star fa-4x mt-5"></i>    

                    </div>
                    )
            }
           

        </div>
    )
}

export default NothingSelected
