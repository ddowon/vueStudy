const Replay = require('../models/replay');

exports.findAll = function (req, res) {
	Replay.find().then(function (docs) {
		if (!docs) {
			res.status(404).json({ message: '등록된 영상이 없습니다.' });
		} else {
			res.status(200).json(docs);
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findByAwardNumber = function (req, res) {
	Replay.find({ 'AWARD_NO': req.params.award_no }).then(function (doc) {
		if (!doc) {
			res.status(404).json({ message: '해당 회차 영상을 찾을 수 없습니다.' });
		} else {
			res.status(200).json(doc);
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};
