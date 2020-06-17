const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
	res.json({ message: 'Welcome to Backsang Awards API!' });
});

module.exports = router;
