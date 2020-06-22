const Notice = require('../models/notice');

exports.create = function (req, res, next) {
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

	notice.save().then(function (result) {
		res.status(201).json(result);
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findAll = function (req, res, next) {
	Notice.find().then(function (result) {
		if (!result) {
			res.status(404).json({ message: '등록된 게시글이 없습니다.' });
		} else {
			res.status(200).json(result);
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findById = function (req, res, next) {
	Notice.findOne({ id: req.params.id }).then(function (result) {
		if (!result) {
			return res.status(404).json({ message: `해당 게시글을 찾을 수 없습니다. (${req.params.id}번)` });
		} else {
			res.status(200).json(result);
		}
	}).catch(function (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ message: `해당 게시글을 찾을 수 없습니다. (${req.params.id}번)` });
		} else {
			return res.status(500).json({ error: err });
		}
	});
};

exports.update = function (req, res, next) {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({ message: '입력 필드에 내용을 입력해 주세요.' });
	}

	Notice.findOneAndUpdate({ id: req.params.id }, { $set: req.body }).then(function (result) {
		if (!result) {
			return res.status(404).json({ message: `해당 게시글을 찾을 수 없습니다. (${req.params.id}번)` });
		} else {
			res.status(200).json();
		}
	}).catch(function (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ message: `해당 게시글을 찾을 수 없습니다. (${req.params.id}번)` });
		} else {
			return res.status(500).json({ error: err });
		}
	});
};

exports.delete = function (req, res, next) {
	Notice.findOneAndDelete({ id: req.params.id }).then(function (result) {
		if (!result) {
			return res.status(404).json({ message: `해당 게시글을 찾을 수 없습니다. (${req.params.id}번)` });
		} else {
			res.status(200).json(result);
		}
	}).catch(function (err) {
		return res.status(500).json({ error: err });
	});
};
