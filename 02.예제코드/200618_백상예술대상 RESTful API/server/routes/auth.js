const users = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

const authJwt = require('../middlewares/authJwt.js');

// 회원가입
router.post('/signup', users.create);

// 로그인
router.post('/signin', users.signin);

module.exports = router;
