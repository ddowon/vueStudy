const notices = require('../controllers/notice.controller');
const express = require('express');
const router = express.Router();

const authJwt = require('../middlewares/authJwt.js');
const fileUpload = require('../middlewares/fileUpload.js');

/**
 * @swagger
 * tags:
 *   name: Notice
 *   description: 공지사항 게시판 관련 URI
 * /notice:
 *   get:
 *     tags: [Notice]
 *     summary: 모든 공지사항 게시글 보기
 *     description: 저장된 모든 공지사항 게시글을 열람할 수 있습니다.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: JSON 데이터 요청 성공
 *       404:
 *         description: 등록된 게시글이 없습니다.
 * /notice?page=n&size=n:
 *   get:
 *     tags: [Notice]
 *     summary: 페이징 처리한 공지사항 게시글 보기
 *     description: query에 전달한 page값, size값을 바탕으로 공지사항 게시글 중 페이징 처리된 목록을 반환합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: page
 *         description: 게시글 페이징 처리 시 가져올 페이지 번호 (최소 1부터)
 *         type: integer
 *         minimum: 1
 *         required: true
 *       - in: query
 *         name: size
 *         description: 게시글 페이징 처리 시 한 번에 불러 올 게시글 수 (최소 2부터)
 *         type: integer
 *         minimum: 2
 *         required: true
 *     responses:
 *       200:
 *         description: JSON 데이터 요청 성공
 *       404:
 *         description: 등록된 게시글이 없습니다.
 * /notice/{id}:
 *   get:
 *     tags: [Notice]
 *     summary: 특정 공지사항 게시글 보기
 *     description: 특정 공지사항 게시글을 열람할 수 있습니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 공지사항 게시글 고유번호
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: JSON 데이터 요청 성공
 *       404:
 *         description: 해당 게시글을 찾을 수 없습니다.
 * /notice/write:
 *   post:
 *     tags: [Notice]
 *     summary: 공지사항 새 게시글 작성하기
 *     description: 공지사항 게시판에 새로운 게시글을 작성합니다. 회원만 작성 가능하므로 인증 토큰값이 필요합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         in: formData
 *         description: 게시글 제목
 *         required: true
 *         type: string
 *       - name: contents
 *         in: formData
 *         description: 게시글 내용
 *         required: true
 *         type: string
 *       - name: files
 *         in: formData
 *         description: 게시글에 삽입할 첨부파일 (jpg, jpeg, png, gif)
 *         required: false
 *         type: file
 *     responses:
 *       200:
 *         description: JSON 데이터 요청 성공
 *       400:
 *         description: 글 제목/글 내용을 입력해 주세요.
 *       404:
 *         description: 잘못된 접근입니다.
 *     security:
 *       - JWT: []
 * /notice/edit/{id}:
 *   put:
 *     tags: [Notice]
 *     summary: 공지사항 게시글 수정하기
 *     description: 공지사항 게시판에 작성된 게시글을 수정할 수 있습니다. 자신의 게시글일 경우 또는 관리자만 수정 가능하므로 인증 토큰값이 필요합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 공지사항 게시글 고유번호
 *         required: true
 *         type: integer
 *       - name: title
 *         in: formData
 *         description: 수정할 게시글 제목
 *         required: false
 *         type: string
 *       - name: contents
 *         in: formData
 *         description: 수정할 게시글 내용
 *         required: false
 *         type: string
 *       - name: files
 *         in: formData
 *         description: 수정/삭제할 첨부파일 (jpg, jpeg, png, gif)
 *         required: false
 *         type: file
 *     responses:
 *       200:
 *         description: JSON 데이터 요청 성공
 *       400:
 *         description: 입력 필드에 내용을 입력해 주세요.
 *       404:
 *         description: 해당 게시글을 찾을 수 없습니다.
 *     security:
 *       - JWT: []
 * /notice/delete/{id}:
 *   delete:
 *     tags: [Notice]
 *     summary: 공지사항 게시글 삭제하기
 *     description: 공지사항 게시판에 작성된 게시글을 삭제할 수 있습니다. 자신의 게시글일 경우 또는 관리자만 삭제 가능하므로 인증 토큰값이 필요합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 공지사항 게시글 고유번호
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: JSON 데이터 요청 성공
 *       404:
 *         description: 해당 게시글을 찾을 수 없습니다.
 *     security:
 *       - JWT: []
 */

router.get('/', notices.findAll);
router.get('/:id', notices.findById);

// 글작성, 글수정 회원만
router.post('/write', [ authJwt.verifyToken, authJwt.isAuthentication, fileUpload.uploadImage ], notices.create);
router.put('/edit/:id', [ authJwt.verifyToken, authJwt.isAuthentication, fileUpload.uploadImage ], notices.update);

// 글삭제 회원만
router.delete('/delete/:id', [ authJwt.verifyToken, authJwt.isAuthentication ], notices.delete);

module.exports = router;
