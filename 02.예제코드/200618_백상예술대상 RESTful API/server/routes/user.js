const users = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.get('/:id', users.findById);

router.post('/', users.create);
router.put('/:id', users.update);

router.delete('/:id', users.delete);

module.exports = router;
