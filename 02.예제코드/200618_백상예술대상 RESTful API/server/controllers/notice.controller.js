const Notice = require('../models/notice');

const myCustomLabels = {
	docs: 'itemsList',
	limit: 'itemPerPage',
	totalDocs: 'totalItemCount',
	totalPages: 'totalPageCount',
	page: 'currentPage'
};

exports.create = (req, res, next) => {
	if (!req.body.title) {
		return res.status(400).json({ message: '글 제목을 입력해 주세요.' });
	}
	if (!req.body.contents) {
		return res.status(400).json({ message: '글 내용을 입력해 주세요.' });
	}

	const notice = new Notice({
		title: req.body.title,
		contents: req.body.contents,
		writer: (req.body.id) ? req.body.id : '',
		tags: (req.body.tags) ? req.body.tags : []
	});

	notice.save().then((result) => {
		res.status(201).json(result);
	}).catch((err) => {
		res.status(500).json({ error: err });
	});
};

exports.findAll = (req, res, next) => {
	const options = {
		page: req.query.page || 1,
		limit: req.query.size || 10,
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

	Notice.findOneAndUpdate({ id: req.params.id }, { $set: req.body }).then((result) => {
		if (!result) {
			return res.status(404).json({ message: `해당 게시글을 찾을 수 없습니다. (${req.params.id}번)` });
		} else {
			res.status(200).json();
		}
	}).catch((err) => {
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
			res.status(200).json(result);
		}
	}).catch((err) => {
		return res.status(500).json({ error: err });
	});
};
