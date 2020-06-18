const Candidate = require('../models/candidate');

exports.findAll = function (req, res) {
	Candidate.find().then(function (docs) {
		if (!docs) {
			res.status(404).json({ message: '등록된 후보가 없습니다.' });
		} else {
			res.status(200).json(docs);
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findByDivision = function (req, res) {
	Candidate.find({ 'DIVISION': req.params.division }).then(function (doc) {
		if (!doc) {
			res.status(404).json({ message: '해당 부문 후보를 찾을 수 없습니다.' });
		} else {
			res.status(200).json(doc);
		}
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};
