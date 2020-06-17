const candidates = require('../controllers/candidate.controller');
const express = require('express');
const router = express.Router();

router.get('/', candidates.findAll);
router.get('/:division', candidates.findByDivision);

module.exports = router;
