const Winner = require('../models/winner');

exports.findById = (req, res) => {
	Winner.find({ 'AWARD_NUM': req.params.id }).then((result) => {
		if (!result || !result.length) {
			return res.status(404).json({ message: '해당 회차 결과를 찾을 수 없습니다.' });
		} else {
			res.status(200).json(result);
		}
	}).catch((err) => {
		res.status(500).json({ error: err });
	});
};

exports.findByDivision = (req, res) => {
	Winner.find({ 'AWARD_NUM': req.params.id, 'DIVISION': req.params.division }).then((result) => {
		if (!result || !result.length) {
			return res.status(404).json({ message: '해당 회차 부문에 따른 결과를 찾을 수 없습니다.' });
		} else {
			res.status(200).json(result);
		}
	}).catch((err) => {
		res.status(500).json({ error: err });
	});
};