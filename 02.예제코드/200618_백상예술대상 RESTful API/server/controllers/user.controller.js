const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret_key = process.env.SECRET_KEY;
const Roles = [ 'user', 'admin' ];

exports.create = (req, res, next) => {
	if (!req.body.email) {
		return res.status(400).json({ message: '이메일을 입력해 주세요.' });
	}
	if (!req.body.name) {
		return res.status(400).json({ message: '닉네임을 입력해 주세요.' });
	}
	if (!req.body.password) {
		return res.status(400).json({ message: '비밀번호를 입력해 주세요.' });
	}
	if (req.body.roles) {
		return req.body.roles.map((role) => {
			if (!Roles.includes(role)) {
				return res.status(400).json({ message: `'${role}'는 존재하지 않는 권한 입니다!` });
			}
		});
	}

	User.findOne({ email: req.body.email }).then((result) => {
		if (result) {
			return res.status(400).json({ message: '이미 존재하는 이메일 입니다!' });
		}
	}).catch((err) => {
		res.status(500).json({ error: err });
	});

	User.findOne({ name: req.body.name }).then((result) => {
		if (result) {
			return res.status(400).json({ message: '이미 존재하는 닉네임 입니다!' });
		}
	}).catch((err) => {
		res.status(500).json({ error: err });
	});

	const salt = bcrypt.genSaltSync(10);
	const password = bcrypt.hashSync(req.body.password, salt);

	const user = new User({
		email: req.body.email,
		name: req.body.name,
		password: password
	});

	user.save().then((result) => {
		res.status(201).json({ message: `회원가입 완료! (${result})` });
	}).catch((err) => {
		res.status(500).json({ error: err });
	});
};

exports.signin = (req, res, next) => {
	if (!req.body.email) {
		return res.status(400).json({ message: '이메일을 입력해 주세요.' });
	}
	if (!req.body.password) {
		return res.status(400).json({ message: '비밀번호를 입력해 주세요.' });
	}

	User.findOne({ email: req.body.email }).then((user) => {
		if (!user) {
			return res.status(404).json({ message: `해당 회원을 찾을 수 없습니다. (${req.body.email})` });
		}

		let passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		);

		if (!passwordIsValid) {
			return res.status(401).json({ accessToken: null, message: '비밀번호가 맞지 않습니다!' });
		}

		let token = jwt.sign({ id: user.id, name: user.name, role: user.role, email: user.email }, secret_key, {
			expiresIn: '24h'
		});

		User.findOneAndUpdate({ email: req.body.email }, { $set: { authToken: token } }, { returnOriginal: false }).then((result) => {
			return res.status(200).json({ accessToken: result.authToken });
		});
	}).catch((err) => {
		return res.status(500).json({ error: err });
	});
};

exports.generateSwaggerToken = (req, res, next) => {
	User.findOne({ email: 'test@test.com' }).then((user) => {
		let token = jwt.sign({ id: user.id, name: user.name, role: 'admin', email: user.email }, secret_key, {
			expiresIn: '24h'
		});

		User.findOneAndUpdate({ email: 'test@test.com' }, { $set: { authToken: token } }, { returnOriginal: false }).then((result) => {
			return res.status(200).json({ accessToken: result.authToken });
		});
	}).catch((err) => {
		return res.status(500).json({ error: err });
	});
};

exports.findAll = (req, res, next) => {
	User.find().then((result) => {
		if (!result) {
			return res.status(404).json({ message: `가입된 회원이 없습니다.` });
		} else {
			res.status(200).json(result);
		}
	}).catch((err) => {
		return res.status(500).json({ error: err });
	});
};

exports.findById = (req, res, next) => {
	User.findOne({ id: req.params.id, email: req.user.email }).then((result) => {
		if (!result) {
			return res.status(404).json({ message: `잘못된 접근입니다! (${req.params.id}, ${req.user.email})` });
		} else {
			res.status(200).json(result);
		}
	}).catch((err) => {
		return res.status(500).json({ error: err });
	});
};

exports.update = (req, res, next) => {
	if (req.body.password) {
		var salt = bcrypt.genSaltSync(10);
		var password = bcrypt.hashSync(req.body.password, salt);
	} else {
		var password = req.user.password;
	}
	if (req.body.name) {
		var username = req.body.name;
	} else {
		var username = req.user.name;
	}

	User.findOneAndUpdate({ id: req.params.id, email: req.user.email }, { $set: { name: username, password: password } }, { returnOriginal: false }).then((result) => {
		if (!result) {
			return res.status(404).json({ message: `잘못된 접근입니다! (${req.params.id}, ${req.user.email})` });
		} else {
			res.status(200).json(result);
		}
	}).catch((err) => {
		return res.status(500).json({ error: err });
	});
};

exports.delete = (req, res, next) => {
	User.findOneAndDelete({ id: req.params.id, email: req.user.email }).then((result) => {
		if (!result) {
			return res.status(404).json({ message: `잘못된 접근입니다! (${req.params.id}, ${req.user.email})` });
		} else {
			res.status(200).json(result);
		}
	}).catch((err) => {
		return res.status(500).json({ error: err });
	});
};
