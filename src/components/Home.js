import React from 'react'
import AddNote from './AddNote'
import Note from './Note'


const Home = ({showAlert}) => {
    
    return (
        <div>
            <AddNote showAlert={showAlert}/>
            <Note showAlert={showAlert}/>
        </div>
    )
}

export default Home