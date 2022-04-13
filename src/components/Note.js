import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import '../App.css';
import { useNavigate } from 'react-router-dom';


const Note = ({showAlert}) => {
    const navigate = useNavigate();
    const { notes, deleteNote, getNote, editNote } = useContext(noteContext);

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNote();
        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])


    const ref = useRef(null);
    const cref = useRef(null);
    const [note, setNote] = useState({id:"", title: "", tag: "", description: "" })
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const updatenote = (cnote) => {
        ref.current.click();
        //editNote(id);
        setNote({id:cnote._id,title:cnote.title,tag:cnote.tag,description:cnote.description})
        //console.log(cnote);
       
    }
    const handleclick = ()=>{
        //console.log(note);
        editNote(note.id, note.title, note.tag, note.description);
        cref.current.click();
        showAlert("Updated Successfully","success");
       
    }

    return (
        <div >
            <div>

                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Edit Note
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='w-75 mx-auto my-5'>

                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="title" name='title' value={note.title} placeholder="example title" onChange={onchange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} placeholder="example tag" onChange={onchange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                        <textarea className="form-control" id="description" name='description' value={note.description} rows="3" onChange={onchange} minLength={5} required></textarea>

                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={cref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={note.title.length<5 || note.description.length<5} type="button" className="btn btn-primary" onClick={handleclick}>Edit Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          <div>
                {notes.length===0 && "No Notes to Display"}
                {notes.map((note) => {
                    return (
                        <div className='noteText' key={note._id}>
                            <div className="noteIcons text-end ">
                                <i className="bi bi-trash mx-2" onClick={() => { deleteNote(note._id); 
                                    showAlert("Deleted Successfully","success"); }}></i>
                                <i className="bi bi-pencil-square" onClick={() => { updatenote(note) }}></i>
                            </div>

                            <h6 className=''>Title :  {note.title}</h6>
                            <h6 className='mb-2'>Tag : {note.tag}</h6>
                            <p>{note.description}</p>
                        </div>)
                })}
         </div>
        </div>

    )
}

export default Note