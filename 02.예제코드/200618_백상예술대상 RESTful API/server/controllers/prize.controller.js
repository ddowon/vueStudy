const Prize = require('../models/prize');

exports.findAll = function (req, res) {
	Prize.find().then(function (docs) {
		if (!docs) {
			res.status(404).json({ message: '등록된 상이 없습니다.' });
		} else {
			res.status(200).json(docs);
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findByDivision = function (req, res) {
	Prize.find({ 'DIVISION': req.params.division }).then(function (doc) {
		if (!doc) {
			res.status(404).json({ message: '해당 상을 찾을 수 없습니다.' });
		} else {
			res.status(200).json(doc);
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findByPrizeCode = function (req, res) {
	Prize.find({ 'DIVISION': req.params.division, 'PRIZE_CD': req.params.prize_cd }).then(function (doc) {
		if (!doc) {
			res.status(404).json({ message: '해당 상을 찾을 수 없습니다.' });
		} else {
			res.status(200).json(doc);
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};