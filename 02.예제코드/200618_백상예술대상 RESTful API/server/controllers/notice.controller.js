const Notice = require('../models/notice');
const fs = require('fs');

const myCustomLabels = {
	docs: 'itemsList',
	limit: 'itemPerPage',
	totalDocs: 'totalItemCount',
	totalPages: 'totalPageCount',
	page: 'currentPage'
};

const deleteFile = (files) => {
	files.map((file) => {
		fs.unlink(file.path, (err) => {
			if (err) {
				console.log(err)
				return;
			}
		})
	});
};

exports.create = (req, res, next) => {
	if (!req.body.title) {
		return res.status(400).json({ message: '글 제목을 입력해 주세요.' });
	}
	if (!req.body.contents) {
		return res.status(400).json({ message: '글 내용을 입력해 주세요.' });
	}

	let url = req.protocol + '://' + req.get('host') + '/'
	req.body.files = []
	if (req.files.length) {
		req.files.map((file, index) => {
			req.body.files[index] = {
				'name': file.originalname,
				'url': url + file.destination + file.filename,
				'type': file.mimetype,
				'size': file.size,
				'path': file.path
			}
		})
	}

	const notice = new Notice({
		title: req.body.title,
		contents: req.body.contents,
		writer: req.user.name,
		tags: (req.body.tags) ? req.body.tags : [],
		files: req.body.files
	});

	notice.save().then((result) => {
		res.status(201).json({ message: `공지사항 게시판 글 작성 완료! (${result})` });
	}).catch((err) => {
		res.status(500).json({ error: err });
	});
};

exports.findAll = (req, res, next) => {
	const options = {
		page: req.query.page || 1,
		limit: req.query.size || 10,
		sort: { 'id': -1 },
		select: '-files -tags -contents -updated_at -__v',
		customLabels: myCustomLabels
	};
	Notice.paginate({}, options).then((result) => {
		if (!result || !result.itemsList.length) {
			return res.status(404).json({ message: '등록된 게시글이 없습니다.' });
		} else {
			res.status(200).json(result);
		}
	}).catch((err) => {
		res.status(500).json({ error: err });
	});
};

exports.findById = (req, res, next) => {
	const options = {
		page: req.query.page || 1,
		limit: req.query.size || 10,
		select: '-__v',
		customLabels: myCustomLabels
	};
	Notice.paginate({ 'id': req.params.id }, options).then((result) => {
		if (!result || !result.itemsList.length) {
			return res.status(404).json({ message: `해당 게시글을 찾을 수 없습니다. (${req.params.id}번)` });
		} else {
			res.status(200).json(result);
		}
	}).catch((err) => {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ message: `해당 게시글을 찾을 수 없습니다. (${req.params.id}번)` });
		} else {
			return res.status(500).json({ error: err });
		}
	});
};

exports.update = (req, res, next) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({ message: '입력 필드에 내용을 입력해 주세요.' });
	}

	let url = req.protocol + '://' + req.get('host') + '/'
	if (req.files.length) {
		req.body.files = []
		req.files.map((file, index) => {
			req.body.files[index] = {
				'name': file.originalname,
				'url': url + file.destination + file.filename,
				'type': file.mimetype,
				'size': file.size,
				'path': file.path
			}
		})
	}

	// 글 수정 시, Front에서 넘어온 delete_files 체크박스 있으면 해당 파일 삭제
	if (req.body.delete_files.length) {
		deleteFile(req.body.delete_files);
	}

	Notice.findOneAndUpdate({ id: req.params.id }, { $set: req.body }).then((result) => {
		if (!result) {
			if (req.body.files.length) {
				deleteFile(req.body.files);
			}
			return res.status(404).json({ message: `해당 게시글을 찾을 수 없습니다. (${req.params.id}번)` });
		} else {
			return res.status(200).json({ message: `공지사항 게시판 글 수정 완료! (${result})` });
		}
	}).catch((err) => {
		if (req.body.files.length) {
			deleteFile(req.body.files);
		}
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ message: `해당 게시글을 찾을 수 없습니다. (${req.params.id}번)` });
		} else {
			return res.status(500).json({ error: err });
		}
	});
};

exports.delete = (req, res, next) => {
	Notice.findOneAndDelete({ id: req.params.id }).then((result) => {
		if (!result) {
			return res.status(404).json({ message: `해당 게시글을 찾을 수 없습니다. (${req.params.id}번)` });
		} else {
			if (result.files.length) {
				deleteFile(result.files);
			}
			return res.status(200).json({ message: `공지사항 게시판 글 삭제 완료! (${result})` });
		}
	}).catch((err) => {
		return res.status(500).json({ error: err });
	});
};
