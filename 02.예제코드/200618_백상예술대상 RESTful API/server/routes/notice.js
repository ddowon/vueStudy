const notices = require('../controllers/notice.controller');
const express = require('express');
const router = express.Router();

const fileUpload = require('../middlewares/fileUpload.js');

router.get('/', notices.findAll);
router.get('/:id', notices.findById);

router.post('/', [ fileUpload.uploadImage ], notices.create);
router.put('/:id', [ fileUpload.uploadImage ], notices.update);

router.delete('/:id', notices.delete);

module.exports = router;
