const express = require('express')
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');



// ROUTE 1: Get all the notes using: GET "/api/notes/fetchAllNotes".  Login required
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": "internal Server Error" });
    }

})



// -------------------------------------------------------------------------------------//

// ROUTE 2: Add all the notes using: POST "/api/notes/addnote".  Login required
router.post('/addnote', fetchUser, [
    body('title', 'title must be min 3 character').isLength({ min: 3 }),
    body('description', 'desc must be min 5 character').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({ title, description, tag, user: req.user.id });
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": "internal Server Error" });
    }

})





// -------------------------------------------------------------------------------------//

// ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote".  Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        //creating a new note
        const newNote = {};
        if(title){
            newNote.title=title;
        }
        if(description){
            newNote.description=description;
        }
        if(tag){
            newNote.tag=tag;
        }
        
        //find a note to be updated and after finding update it.
        let note = await Note.findById(req.params.id);
        if(!note){
            res.status(404).send("Not Found");
        }

        if(note.user.toString()!==req.user.id){
            res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true});
        res.json(note);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": "internal Server Error" });
    }

})



// -------------------------------------------------------------------------------------//

// ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote".  Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {
        //find a note to be Deleted and after finding delete it.
        let note = await Note.findById(req.params.id);
        if(!note){
            res.status(404).send("Not Found");
        }
        
        //Allow deletion only if user owns corrosponding note
        if(note.user.toString()!==req.user.id){
            res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"success":`Note with id : ${req.params.id} has been deleted`,note : note});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": "internal Server Error" });
    }

})

module.exports = router;