const winners = require('../controllers/winner.controller');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Winners
 *   description: 수상자 관련 URI
 * /winners/{id}:
 *   get:
 *     tags: [Winners]
 *     summary: 특정 회차 수상자 목록 보기
 *     description: 53~55회 백상예술대상의 특정 회차 수상자 목록을 가져옵니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 가져올 회차 (53~55)
 *         required: true
 *         type: integer
 *         minimum: 53
 *         maximum: 55
 *     responses:
 *       200:
 *         description: JSON 데이터 요청 성공
 *       404:
 *         description: 해당 회차 결과를 찾을 수 없습니다.
 * /winners/{id}/{division}:
 *   get:
 *     tags: [Winners]
 *     summary: 특정 회차 및 특정 부문 수상자 목록 보기
 *     description: 53~55회 백상예술대상의 특정 회차 및 특정 부문 수상자 목록을 가져옵니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 가져올 회차 (53~55)
 *         required: true
 *         type: integer
 *         minimum: 53
 *         maximum: 55
 *       - name: division
 *         in: path
 *         description: 가져올 부문 (tv/movie/play)
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: JSON 데이터 요청 성공
 *       404:
 *         description: 해당 회차 부문에 따른 결과를 찾을 수 없습니다.
 */

router.get('/:id', winners.findById);
router.get('/:id/:division', winners.findByDivision);

module.exports = router;
