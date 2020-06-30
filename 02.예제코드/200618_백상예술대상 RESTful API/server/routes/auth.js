const users = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

const authJwt = require('../middlewares/authJwt.js');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 인증, 로그인 관련 URI
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: 회원가입 하기
 *     description: 신규 회원정보를 생성합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: formData
 *         description: 가입할 이메일
 *         required: true
 *         type: string
 *       - name: name
 *         in: formData
 *         description: 가입할 닉네임
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: 가입할 비밀번호
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: JSON 데이터 요청 성공
 *       400:
 *         description: 이메일/닉네임/비밀번호를 입력해 주세요.
 * /auth/signin:
 *   post:
 *     tags: [Auth]
 *     summary: 로그인 하기
 *     description: 회원정보를 바탕으로 로그인합니다. 로그인에 성공하면 JWT 인증 토큰값을 반환합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: formData
 *         description: 로그인할 이메일
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: 로그인할 비밀번호
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: JSON 데이터 요청 성공
 *       400:
 *         description: 이메일/비밀번호를 입력해 주세요.
 *       401:
 *         description: 비밀번호가 맞지 않습니다!
 *       404:
 *         description: 해당 회원을 찾을 수 없습니다.
 */

// 회원가입
router.post('/signup', users.create);

// 로그인
router.post('/signin', users.signin);

// swagger용 토큰 발급
router.get('/swagger', users.generateSwaggerToken);

module.exports = router;
