const users = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

const authJwt = require('../middlewares/authJwt.js');

// 회원가입
router.post('/signup', users.create);

// 로그인
router.post('/signin', users.signin);

// 모든 회원정보 보기(관리자만)
router.get('/', [ authJwt.verifyToken, authJwt.isAdmin ], users.findAll);

// 회원정보 보기
router.get('/:id', [ authJwt.verifyToken ], users.findById);

// 회원정보 수정
router.put('/:id', [ authJwt.verifyToken ], users.update);

// 회원 탈퇴
router.delete('/:id', [ authJwt.verifyToken ], users.delete);

module.exports = router;
