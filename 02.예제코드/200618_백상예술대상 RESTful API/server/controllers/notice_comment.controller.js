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
	if (!req.params.pr_id) {
		return res.status(404).json({ message: `댓글을 작성 할 게시글 번호가 없습니다. (${req.params.pr_id}번)` });
	}
	if (!req.body.contents) {
		return res.status(400).json({ message: '댓글 내용을 입력해 주세요.' });
	}
	if (!req.isLogged) {
		if (!req.body.name) {
			return res.status(400).json({ message: '닉네임을 입력해 주세요.' });
		}
		if (!req.body.password) {
			return res.status(400).json({ message: '비밀번호를 입력해 주세요.' });
		}
	}
	Notice.findOne({ id: req.params.pr_id }).then((parent_doc) => {
		if (!parent_doc) {
			return res.status(404).json({ message: `댓글을 작성 할 게시글 번호가 없습니다. (${req.params.pr_id}번)` });
		}
		let password = null;

		if (!req.isLogged) {
			const salt = bcrypt.genSaltSync(10);
			password = bcrypt.hashSync(req.body.password, salt);
		}

		const noticeComment = new NoticeComment({
			pr_id: req.params.pr_id,
			author: (req.isLogged) ? req.user._id : null,
			display_name: (req.isLogged) ? req.user.name : req.body.name,
			contents: req.body.contents,
			password: (req.isLogged) ? null : password
		});

		noticeComment.save().then((comment) => {
			Notice.findOneAndUpdate({ id: req.params.pr_id }, { $push: { comments: comment._id }, $inc: { 'cnt.comment': 1 } }, { returnOriginal: false }).then((result) => {
				console.log(`공지사항 게시판 게시글 코멘트 수 증가 완료!`);
				return res.status(201).json({ message: `공지사항 게시판 댓글 작성 완료! (${result})` });
			}).catch((err) => {
				return res.status(500).json({ error: err });
			});
		}).catch((err) => {
			return res.status(500).json({ error: err });
		});
	}).catch((err) => {
		return res.status(500).json({ error: err });
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
			populate: {
				path: 'author',
				options: {
					select: 'name'
				}
			},
			page: req.query.page || 1,
			limit: req.query.size || 200,
			sort: { 'id': 1 },
			select: '-_id pr_id id author display_name contents created_at cnt',
			customLabels: myCustomLabels
		};

		return NoticeComment.paginate({ pr_id: req.params.pr_id }, options);
	}).then((result) => {
		if (!result || !result.itemsList.length) {
			return res.status(404).json({ message: '등록된 댓글이 없습니다.' });
		} else {
			return res.status(200).json(result);
		}
	}).catch((err) => {
		return res.status(500).json({ error: err });
	});
};

exports.delete = (req, res, next) => {
	if (!req.params.pr_id) {
		return res.status(404).json({ message: `댓글을 삭제할 게시글 번호가 없습니다. (${req.params.pr_id}번)` });
	}
	if (!req.isLogged && !req.body.password) {
		return res.status(400).json({ message: '비밀번호를 입력해 주세요.' });
	}
	Notice.findOne({ id: req.params.pr_id }).populate('author').then((result) => {
		if (!result) {
			return res.status(404).json({ message: `댓글을 삭제할 게시글이 존재하지 않습니다. (${req.params.pr_id}번)` });
		}
		NoticeComment.findOne({ pr_id: req.params.pr_id, id: req.params.id }).populate('author').then((result) => {
			if (!result) {
				return res.status(404).json({ message: `삭제할 댓글을 찾을 수 없습니다. (${req.params.id}번)` });
			}
			// 관리자가 아닐 때만 삭제 권한 확인
			if (!req.isAdmin) {
				// 회원이 작성한 글이면,
				if (result.author) {
					if (!req.isLogged) {
						return res.status(404).json({ message: '댓글 삭제 권한이 없습니다.' });
					} else if (req.user.email != result.author.email) {
						return res.status(401).json({ message: '내가 쓴 댓글만 삭제할 수 있습니다.' });
					}
				}
				// 비회원이 작성한 글이면,
				if (!result.author) {
					if (req.isLogged) {
						return res.status(404).json({ message: '댓글 삭제 권한이 없습니다.' });
					} else if (!bcrypt.compareSync(req.body.password, result.password)) {
						return res.status(401).json({ message: '비밀번호가 맞지 않습니다!' });
					}
				}
			}

			NoticeComment.findOneAndDelete({ pr_id: req.params.pr_id, id: req.params.id }).then((comment) => {
				Notice.findOneAndUpdate({ id: req.params.pr_id }, { $pull: { comments: comment._id }, $inc: { 'cnt.comment': -1 } }, { returnOriginal: false }).then((result) => {
					console.log(`공지사항 게시판 게시글 코멘트 수 감소 완료!`);
					return res.status(200).json({ message: `공지사항 게시판 댓글 삭제 완료! (${result})` });
				}).catch((err) => {
					res.status(500).json({ error: err });
				});
			}).catch((err) => {
				res.status(500).json({ error: err });
			});
		}).catch((err) => {
			res.status(500).json({ error: err });
		});
	}).catch((err) => {
		res.status(500).json({ error: err });
	});
};
