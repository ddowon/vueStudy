const winners = require('../controllers/winner.controller');
const express = require('express');
const router = express.Router();

router.get('/:id', winners.findById);
router.get('/:id/:division', winners.findByDivision);

module.exports = router;
