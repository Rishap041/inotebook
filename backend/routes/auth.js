const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "abra_ka_dabra_gilli_gilli_shoo"




// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be min 5 character').isLength({ min: 5 }),
    body('name', 'Name must be min 3 character').isLength({ min: 3 }),
], async (req, res) => {
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ "error": "email already exist" })
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

        res.json({authToken})

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": "internal error occurred" })
    }

})

module.exports = router;