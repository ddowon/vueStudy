const Board = require('../models/board');

exports.create = function (req, res, next) {
	if (!req.body.name || !req.body.subject || !req.body.content) {
		return res.status(400).json({ message: '입력 필드에 내용을 입력해 주세요.' });
	}

	const board = new Board({
		subject: req.body.subject,
		name: req.body.name,
		email: req.body.email,
		content: req.body.content
	});

	board.save().then(function (doc) {
		res.status(200).json(docs);
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findAll = function (req, res, next) {
	Board.find().then(function (docs) {
		if (!docs) {
			res.status(404).json({ message: '등록된 게시글이 없습니다.' });
		} else {
			res.status(200).json(docs);
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findById = function (req, res, next) {
	Board.findOne({ id: req.params.id }).then(function (doc) {
		if (!doc) {
			return res.status(404).json({ message: '해당 게시글을 찾을 수 없습니다. (' + req.params.id  + '번)'});
		}
		res.status(200).json(docs);
	}).catch(function (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ message: '해당 게시글을 찾을 수 없습니다. (' + req.params.id  + '번)'});
		}
		return res.status(500).json({ error: err });
	});
};

exports.update = function (req, res, next) {
	if (!req.body.name || !req.body.subject || !req.body.content) {
		return res.status(400).json({ message: '입력 필드에 내용을 입력해 주세요.' });
	}

	Board.update({ id: req.params.id }, { $set: req.body }).then(function (doc) {
		if (!doc) {
			return res.status(404).json({ message: '해당 게시글을 찾을 수 없습니다. (' + req.params.id  + '번)'});
		}
		res.status(200).json(docs);
	}).catch(function (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ message: '해당 게시글을 찾을 수 없습니다. (' + req.params.id  + '번)'});
		}
		return res.status(500).json({ error: err });
	});
};

exports.delete = function (req, res, next) {
	Board.remove({ id: req.params.id }).then(function (doc) {
		if (!doc) {
			return res.status(404).json({ message: '해당 게시글을 찾을 수 없습니다. (' + req.params.id  + '번)'});
		}
		res.status(200).json(docs);
	}).catch(function (err) {
		return res.status(500).json({ error: err });
	});
};
