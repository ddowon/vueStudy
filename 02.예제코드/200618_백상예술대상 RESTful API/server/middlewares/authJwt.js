const User = require('../models/user');
const jwt = require('jsonwebtoken');

const secret_key = process.env.SECRET_KEY;

exports.verifyToken = function (req, res, next) {
	let token = req.header('x-access-token') || req.body.accessToken || req.query.accessToken;
	if (!token) {
		return res.status(403).json({ message: "인증 토큰값이 없습니다!" });
	}

	jwt.verify(token, secret_key, function (err, decoded) {
		if (err) {
			return res.status(401).json({ message: '인증 토큰값이 잘못되었습니다!' });
		}
		// req.user에 담긴 값 - id: user.id, name: user.name, role: user.role, email: user.email
		req.user = decoded;
		next();
	});
};

exports.isAdmin = function (req, res, next) {
	User.findOne({ email: req.user.email }).exec(function (err, user) {
		if (err) {
			return res.status(500).json({ error: err });
		}

		if (!user) {
			return res.status(404).json({ message: `해당 회원을 찾을 수 없습니다. (${req.user.email})` });
		}

		if (user.role === 'admin') {
			next();
			return;
		} else {
			return res.status(403).json({ message: '관리자 페이지 접근 권한이 없습니다!' });
		}
	});
};
