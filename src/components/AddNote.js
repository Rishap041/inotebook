import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = ({showAlert}) => {
    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({ title: "", tag: "", description: "" })
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", tag: "", description: "" });
        showAlert("Added Successfully","success");
    }
    return (
        <div className="container">
            <form className='w-50 mx-auto my-5'>
                <h3 className='text-center'>Add a Note</h3>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Title*</label>
                    <input type="text" className="form-control" value={note.title} id="title" name='title' placeholder="example title" onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
                    <input type="text" className="form-control" value={note.tag} id="tag" name='tag' placeholder="example tag" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description*</label>
                    <textarea className="form-control" value={note.description} id="description" name='description' rows="3" onChange={onchange} minLength={5} required> </textarea>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary text-cemter" onClick={handleclick}>Add</button>
            </form>
        </div>
    )
}

export default AddNote