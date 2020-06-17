const boards = require('../controllers/board.controller');
const express = require('express');
const router = express.Router();

router.get('/', boards.findAll);
router.get('/:id', boards.findById);

router.post('/', boards.create);
router.put('/:id', boards.update);

router.delete('/:id', boards.delete);

module.exports = router;
