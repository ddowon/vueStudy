const Notice = require('../models/notice');
const NoticeComment = require('../models/notice_comment');
const bcrypt = require('bcryptjs');

const myCustomLabels = {
	docs: 'itemsList',
	limit: 'itemPerPage',
	totalDocs: 'totalItemCount',
	totalPages: 'totalPageCount',
	page: 'currentPage'
};

exports.create = (req, res, next) => {
	if (!req.body.contents) {
		return res.status(400).json({ message: '댓글 내용을 입력해 주세요.' });
	}
	if (!req.body.name) {
		return res.status(400).json({ message: '닉네임을 입력해 주세요.' });
	}
	if (!req.body.password) {
		return res.status(400).json({ message: '비밀번호를 입력해 주세요.' });
	}
	if (!req.params.pr_id) {
		return res.status(404).json({ message: `댓글을 작성 할 게시글 번호가 없습니다. (${req.params.pr_id}번)` });
	}

	Notice.findOne({ id: req.params.pr_id }).then((result) => {
		if (!result) {
			return res.status(404).json({ message: `댓글을 작성 할 게시글 번호가 없습니다. (${req.params.pr_id}번)` });
		}

		const salt = bcrypt.genSaltSync(10);
		const password = bcrypt.hashSync(req.body.password, salt);

		const noticeComment = new NoticeComment({
			pr_id: req.params.pr_id,
			contents: req.body.contents,
			writer: req.body.name,
			password: password
		});

		noticeComment.save().then((result) => {
			return res.status(201).json({ message: `공지사항 게시판 댓글 작성 완료! (${result})` });
		}).catch((err) => {
			return res.status(500).json({ error: err });
		});
	}).catch((err) => {
		res.status(500).json({ error: err });
	});
};

exports.findAllByParentId = (req, res, next) => {
	if (!req.params.pr_id) {
		return res.status(404).json({ message: `댓글을 불러 올 게시글 번호가 없습니다. (${req.params.pr_id}번)` });
	}
	Notice.findOne({ id: req.params.pr_id }).then((result) => {
		if (!result) {
			return res.status(404).json({ message: `댓글을 불러 올 게시글 번호가 없습니다. (${req.params.pr_id}번)` });
		}
		const options = {
			page: req.query.page || 1,
			limit: req.query.size || 200,
			sort: { 'id': 1 },
			select: 'id writer contents created_at likes -_id',
			customLabels: myCustomLabels
		};

		NoticeComment.paginate({ pr_id: req.params.pr_id }, options).then((result) => {
			if (!result || !result.itemsList.length) {
				return res.status(404).json({ message: '등록된 댓글이 없습니다.' });
			} else {
				return res.status(200).json(result);
			}
		}).catch((err) => {
			return res.status(500).json({ error: err });
		});
	}).catch((err) => {
		res.status(500).json({ error: err });
	});
};

exports.delete = (req, res, next) => {
	if (!req.params.pr_id) {
		return res.status(404).json({ message: `댓글을 삭제할 게시글 번호가 없습니다. (${req.params.pr_id}번)` });
	}
	Notice.findOne({ id: req.params.pr_id }).then((result) => {
		if (!result) {
			return res.status(404).json({ message: `댓글을 삭제할 게시글 번호가 없습니다. (${req.params.pr_id}번)` });
		}

		NoticeComment.findOneAndDelete({ pr_id: req.params.pr_id, id: req.params.id }).then((result) => {
			if (!result) {
				return res.status(404).json({ message: `해당 댓글을 찾을 수 없습니다. (${req.params.id}번)` });
			} else {
				let passwordIsValid = bcrypt.compareSync(
					req.body.password,
					result.password
				);

				if (!passwordIsValid) {
					return res.status(401).json({ message: '비밀번호가 맞지 않습니다!' });
				} else {
					return res.status(200).json({ message: `공지사항 게시판 댓글 삭제 완료! (${result})` });
				}
			}
		}).catch((err) => {
			return res.status(500).json({ error: err });
		});
	}).catch((err) => {
		res.status(500).json({ error: err });
	});
};
