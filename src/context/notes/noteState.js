import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const url = "http://localhost:5000/api";
    const [notes, setNotes] = useState([]);
    

   



     /////////////////////Get all notes/////////////////////////////////
     const getNote = async () => {
        const response = await fetch(`${url}/notes/fetchAllNotes`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            }
        });
        const data = await response.json(); 
        //console.log(data);
        setNotes(data);
        
    }


    ///////////////////////////////Add note//////////////////////////
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${url}/notes/addnote`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            },

            body: JSON.stringify({title, tag ,description})
        });

        const note = await response.json(); 
         console.log(note);
        setNotes(notes.concat(note));
    }


    /////////////////////////////Delete note///////////////////////////
    const deleteNote = async (id) => {
        const response = await fetch(`${url}/notes/deletenote/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            }
        });
        const data = response.json(); 
        const newnote = notes.filter((note) => {
            return note._id !== id;
        })
        setNotes(newnote);
    }


    ///////////////////////////////Edit note////////////////////////////////
    const editNote = async (id, title, tag, description) => {
        const response = await fetch(`${url}/notes/updatenote/${id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            },

            body: JSON.stringify({title, tag, description})
        });
        const data =await response.json(); 
         let tdata = JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < tdata.length; i++) {
            const element = tdata[i];
            if (element._id === id) {
                tdata[i].title = title;
                tdata[i].tag = tag;
                tdata[i].description = description;
                break;
            } 
        }
        setNotes(tdata);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;