const notices = require('../controllers/notice.controller');
const noticesComments = require('../controllers/notice_comment.controller');
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
 *         default: 1
 *         required: true
 *       - in: query
 *         name: size
 *         description: 게시글 페이징 처리 시 한 번에 불러 올 게시글 수 (최소 2부터)
 *         type: integer
 *         minimum: 2
 *         default: 10
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
 * /notice/add:
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
 * /notice/update/{id}:
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
 * /notice/{pr_id}/comment?page=n&size=n:
 *   get:
 *     tags: [Notice]
 *     summary: 페이징 처리한 특정 공지사항 게시글 댓글 보기
 *     description: query에 전달한 page값, size값을 바탕으로 특정 공지사항 게시글의 페이징 처리된 댓글을 반환합니다. page값, size값이 없으면 한 번에 200개의 댓글을 불러옵니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pr_id
 *         in: path
 *         description: 공지사항 댓글의 부모 게시글 고유번호
 *         required: true
 *         type: integer
 *       - in: query
 *         name: page
 *         description: 댓글 페이징 처리 시 가져올 페이지 번호 (최소 1부터)
 *         type: integer
 *         minimum: 1
 *         default: 1
 *         required: false
 *       - in: query
 *         name: size
 *         description: 댓글 페이징 처리 시 한 번에 불러 올 게시글 수 (최소 2부터)
 *         type: integer
 *         minimum: 2
 *         default: 200
 *         required: false
 *     responses:
 *       200:
 *         description: JSON 데이터 요청 성공
 *       404:
 *         description: 댓글을 불러 올 게시글 번호가 없습니다. | 등록된 댓글이 없습니다.
 * /notice/{pr_id}/comment/add:
 *   post:
 *     tags: [Notice]
 *     summary: 공지사항 게시글 새 댓글 작성하기
 *     description: 공지사항 게시판 게시글에 새로운 댓글을 작성합니다. 비회원도 댓글을 작성할 수 있습니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pr_id
 *         in: path
 *         description: 공지사항 댓글의 부모 게시글 고유번호
 *         required: true
 *         type: integer
 *       - name: name
 *         in: formData
 *         description: 닉네임
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: 비밀번호
 *         required: true
 *         type: string
 *       - name: contents
 *         in: formData
 *         description: 댓글 내용
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: JSON 데이터 요청 성공
 *       201:
 *         description: 공지사항 게시판 댓글 작성 완료!
 *       400:
 *         description: 댓글 내용/닉네임/비밀번호를 입력해 주세요.
 *       404:
 *         description: 댓글을 작성 할 게시글 번호가 없습니다.
 * /notice/{pr_id}/comment/delete/{id}:
 *   delete:
 *     tags: [Notice]
 *     summary: 공지사항 게시글 댓글 삭제하기
 *     description: 공지사항 게시판 게시글에 작성된 댓글을 삭제합니다. 비밀번호가 일치해야 댓글을 삭제할 수 있습니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pr_id
 *         in: path
 *         description: 공지사항 댓글의 부모 게시글 고유번호
 *         required: true
 *         type: integer
 *       - name: id
 *         in: path
 *         description: 공지사항 댓글 고유번호
 *         required: true
 *         type: integer
 *       - name: password
 *         in: formData
 *         description: 비밀번호
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: JSON 데이터 요청 성공
 *       201:
 *         description: 공지사항 게시판 댓글 삭제 완료!
 *       401:
 *         description: 비밀번호가 맞지 않습니다!
 *       404:
 *         description: 댓글을 삭제할 게시글 번호가 없습니다. | 해당 댓글을 찾을 수 없습니다.
 */

router.get('/', notices.findAll);
router.get('/:id', notices.findById);

// 글작성, 글수정 회원만
router.post('/add', [ authJwt.verifyToken, authJwt.isAuthentication, fileUpload.uploadImage ], notices.create);
router.put('/update/:id', [ authJwt.verifyToken, authJwt.isAuthentication, fileUpload.uploadImage ], notices.update);

// 글삭제 회원만
router.delete('/delete/:id', [ authJwt.verifyToken, authJwt.isAuthentication ], notices.delete);

// 댓글 가져오기
router.get('/:pr_id/comment', noticesComments.findAllByParentId);

// 댓글작성
router.post('/:pr_id/comment/add', noticesComments.create);

// 댓글삭제
router.delete('/:pr_id/comment/delete/:id', noticesComments.delete);

module.exports = router;
