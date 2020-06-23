const express = require('express');
const router = express.Router();

router.get('/pokemon', (req, res) => res.send('HELLO'))

module.exports = router;