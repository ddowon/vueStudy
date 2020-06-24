const Candidate = require('../models/candidate');

exports.findAll = (req, res) => {
	Candidate.find().then((result) => {
		if (!result) {
			return res.status(404).json({ message: '등록된 후보가 없습니다.' });
		} else {
			res.status(200).json(result);
		}
	}).catch((err) => {
		res.status(500).json({ error: err });
	});
};

exports.findByDivision = (req, res) => {
	Candidate.find({ 'DIVISION': req.params.division }).then(function (result) {
		if (!result) {
			return res.status(404).json({ message: '해당 부문 후보를 찾을 수 없습니다.' });
		} else {
			res.status(200).json(result);
		}
	}).catch((err) => {
		res.status(500).json({ error: err });
	});
};
