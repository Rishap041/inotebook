const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "abra_ka_dabra_gilli_gilli_shoo"
const fetchUser = require('../middleware/fetchUser')

// -------------------------------------------------------------------------------------//

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be min 5 character').isLength({ min: 5 }),
    body('name', 'Name must be min 3 character').isLength({ min: 3 }),
], async (req, res) => {
    // If there are errors, return bad request and the errors
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, "error": "email already exist" })
        }

        const salt =  bcrypt.genSaltSync(10);
        const spass = await bcrypt.hash(req.body.password,salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: spass,
        })

        const data ={
            user:{
                id:user.id
            }
        }

        const authToken = jwt.sign(data,JWT_SECRET);
        //console.log(jwtdata);
         success=true;
        res.json({success , authToken})

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": "internal Server Error" });
    }

})



// -------------------------------------------------------------------------------------//

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    // If there are errors, return bad request and the errors
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({"error":"Incorrect Credentials"});
        }

        const passCompare = await bcrypt.compare(password,user.password);
        if(!passCompare){
            success=false;
            return res.status(400).json({success,"error":"Incorrect Credentials"});
        }
        const data ={
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authToken})

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": "internal Server Error" });
    }
    
    

})






// -------------------------------------------------------------------------------------//

// ROUTE 3: Get loggedin user details using: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchUser, async (req, res) => {
   
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": "internal Server Error" });
    }
    
    

})

module.exports = router;