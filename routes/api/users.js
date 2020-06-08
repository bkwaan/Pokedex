const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator/check');

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post('/',[
    check('name')
    .not()
    .isEmpty(),
    check('email')
    .isEmail(),
    check('password')
    .isLength({min:8})
],
(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    console.log(req.body);
    res.send('User Route');
});


module.exports = router;