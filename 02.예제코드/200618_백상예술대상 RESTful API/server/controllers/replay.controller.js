const Replay = require('../models/replay');

const myCustomLabels = {
	docs: 'itemsList',
	limit: 'itemPerPage',
	totalDocs: 'totalItemCount',
	totalPages: 'totalPageCount',
	page: 'currentPage'
};

exports.findAll = (req, res) => {
	Replay.find().then((result) => {
		if (!result) {
			return res.status(404).json({ message: '등록된 영상이 없습니다.' });
		} else {
			res.status(200).json(result);
		}
	}).catch((err) => {
		return res.status(500).json({ error: err });
	});
};

exports.findByAwardNumber = (req, res) => {
	const options = {
		page: req.query.page || 1,
		limit: req.query.size || 8,
		pagination: (req.query.page) ? true : false,
		customLabels: myCustomLabels
	};
	Replay.paginate({ 'AWARD_NO': req.params.award_no }, options).then((result) => {
		if (!result || !result.itemsList.length) {
			return res.status(404).json({ message: '해당 회차 영상을 찾을 수 없습니다.' });
		} else {
			return res.status(200).json(result);
		}
	}).catch((err) => {
		return res.status(500).json({ error: err });
	});
};
