const User = require('../models/user');

exports.create = function (req, res, next) {
	if (!req.body.email) {
		return res.status(400).json({ message: '이메일을 입력해 주세요.' });
	}
	if (!req.body.name) {
		return res.status(400).json({ message: '닉네임을 입력해 주세요.' });
	}
	if (!req.body.password) {
		return res.status(400).json({ message: '비밀번호를 입력해 주세요.' });
	}

	const user = new User({
		email: req.body.email,
		name: req.body.name,
		password: req.body.password,
	});

	user.save().then(function (result) {
		res.status(201).json(result);
	}).catch(function (err) {
		res.status(500).json({ error: err });
	});
};

exports.findById = function (req, res, next) {
	User.findOne({ id: req.params.id }).then(function (result) {
		if (!result) {
			return res.status(404).json({ message: '회원을 찾을 수 없습니다. (' + req.params.id  + '번)'});
		} else {
			res.status(200).json(result);
		}
	}).catch(function (err) {
		return res.status(500).json({ error: err });
	});
};

exports.update = function (req, res, next) {
	if (!req.body.password) {
		return res.status(400).json({ message: '비밀번호를 입력해 주세요.' });
	}

	User.findOneAndUpdate({ id: req.params.id, email: req.body.email }, { name: req.body.name, password: req.body.password }).then(function (result) {
		if (!result) {
			return res.status(404).json({ message: '회원을 찾을 수 없습니다. (' + req.params.id  + '번)'});
		} else {
			res.status(200).json(result);
		}
	}).catch(function (err) {
		return res.status(500).json({ error: err });
	});
};

exports.delete = function (req, res, next) {
	User.findOneAndDelete({ id: req.params.id, email: req.body.email }).then(function (result) {
		if (!result) {
			return res.status(404).json({ message: '해당 회원을 찾을 수 없습니다. (' + req.params.id  + '번)'});
		} else {
			res.status(200).json(result);
		}
	}).catch(function (err) {
		return res.status(500).json({ error: err });
	});
};
