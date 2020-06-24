const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    console.log("request getting called");
    res.json({'msg': 'HELLO'});
});

module.exports = router;