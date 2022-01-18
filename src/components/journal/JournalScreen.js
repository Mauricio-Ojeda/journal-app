import React from 'react'
import { useSelector } from 'react-redux';
import NoteScreen from '../notes/NoteScreen'
import NothingSelected from './NothingSelected';
// import NothingSelected from './NothingSelected'
import Sidebar from './Sidebar'

const JournalScreen = () => {

    const { active } = useSelector( state => state.notes );

    return (
        <div className="container-fluid">
            <div className="journal__main-content animate__animated animate__fadeIn row">
                
                <div className="col-lg-4 col-md-3 col-sm-12 col-xs-12 ">
                    <Sidebar/>

                </div>    

                <main id='noteScreen' className='col-lg-8 col-md-9 col-sm-12 col-xs-12'>
                    { active ? <NoteScreen /> : <NothingSelected />}
                        

                </main>
            </div>

        </div>
    )
}

export default JournalScreen
