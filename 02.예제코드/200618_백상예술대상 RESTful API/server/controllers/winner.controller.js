const Winner = require('../models/winner');

exports.findById = function (req, res) {
	Winner.find({ 'AWARD_NUM': req.params.id }).then(function (doc) {
		if (!doc) {
			res.status(404).json({ message: '해당 회차 결과를 찾을 수 없습니다.' });
		} else {
			res.status(200).json(doc);
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findByDivision = function (req, res) {
	Winner.find({ 'AWARD_NUM': req.params.id, 'DIVISION': req.params.division }).then(function (doc) {
		if (!doc) {
			res.status(404).json({ message: '해당 회차 결과를 찾을 수 없습니다.' });
		} else {
			res.status(200).json(doc);
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};