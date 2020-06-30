const User = require('../models/user');
const jwt = require('jsonwebtoken');

const secret_key = process.env.SECRET_KEY;

exports.verifyToken = (req, res, next) => {
	// 보안을 위해 무조건 header에서 토큰값을 가져옴
	// let token = req.headers['x-access-token'] || req.body.accessToken || req.query.accessToken;
	let token = req.headers['x-access-token'];
	if (!token) {
		return res.status(403).json({ message: '인증 토큰값이 없습니다!' });
	}

	jwt.verify(token, secret_key, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: '인증 토큰값이 잘못되었습니다!' });
		}
		// req.user에 담긴 값 - id: user.id, name: user.name, role: user.role, email: user.email
		req.user = decoded;
		req.user.token = token;
		next();
	});
};

exports.isAuthentication = (req, res, next) => {
	User.findOne({ email: req.user.email }).then((user) => {
		if (!user) {
			return res.status(404).json({ message: `가입된 회원이 아니거나 탈퇴한 회원입니다. (${req.user.email})` });
		}

		if (user.authToken !== req.user.token) {
			return res.status(401).json({ message: '인증 토큰값이 마지막 발급 인증 토큰값과 일치하지 않습니다!' });
		}

		console.log(user);

		next();
	}).catch((err) => {
		return res.status(500).json({ error: err });
	});
};

exports.isAdmin = (req, res, next) => {
	User.findOne({ email: req.user.email }).then((user) => {
		if (!user) {
			return res.status(404).json({ message: `가입된 회원이 아니거나 탈퇴한 회원입니다. (${req.user.email})` });
		}

		if (user.role !== 'admin') {
			return res.status(403).json({ message: '관리자 페이지 접근 권한이 없습니다!' });
		}

		next();
	}).catch((err) => {
		return res.status(500).json({ error: err });
	});
};
