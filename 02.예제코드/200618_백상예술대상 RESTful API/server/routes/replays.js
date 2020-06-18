const replays = require('../controllers/replay.controller');
const express = require('express');
const router = express.Router();

router.get('/', replays.findAll);
router.get('/:award_no', replays.findByAwardNumber);

module.exports = router;
