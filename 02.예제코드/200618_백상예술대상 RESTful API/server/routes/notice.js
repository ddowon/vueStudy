const notices = require('../controllers/notice.controller');
const express = require('express');
const router = express.Router();

router.get('/', notices.findAll);
router.get('/:id', notices.findById);

router.post('/', notices.create);
router.put('/:id', notices.update);

router.delete('/:id', notices.delete);

module.exports = router;
