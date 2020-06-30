const Prize = require('../models/prize');

exports.findAll = (req, res) => {
	Prize.find().then((result) => {
		if (!result) {
			res.status(404).json({ message: '등록된 상이 없습니다.' });
		} else {
			res.status(200).json(result);
		}
	}).catch((err) => {
		res.status(500).json({ error: err });
	});
};

exports.findByDivision = (req, res) => {
	Prize.find({ 'DIVISION': req.params.division }).then((result) => {
		if (!result || !result.length) {
			res.status(404).json({ message: '해당 부문을 찾을 수 없습니다.' });
		} else {
			res.status(200).json(result);
		}
	}).catch((err) => {
		res.status(500).json({ error: err });
	});
};

exports.findByPrizeCode = (req, res) => {
	req.params.prize_cd = req.params.prize_cd.toUpperCase()
	Prize.find({ 'DIVISION': req.params.division, 'PRIZE_CD': req.params.prize_cd }).then((result) => {
		if (!result || !result.length) {
			res.status(404).json({ message: '해당 상을 찾을 수 없습니다.' });
		} else {
			res.status(200).json(result);
		}
	}).catch((err) => {
		res.status(500).json({ error: err });
	});
};