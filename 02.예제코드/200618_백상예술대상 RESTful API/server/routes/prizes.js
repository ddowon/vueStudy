const prizes = require('../controllers/prize.controller');
const express = require('express');
const router = express.Router();

router.get('/', prizes.findAll);
router.get('/:division', prizes.findByDivision);
router.get('/:division/:prize_cd', prizes.findByPrizeCode);

module.exports = router;
