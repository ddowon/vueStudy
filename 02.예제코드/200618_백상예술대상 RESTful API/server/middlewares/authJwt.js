const User = require('../models/user');
const jwt = require('jsonwebtoken');

const secret_key = process.env.SECRET_KEY;

const verifyToken = (token) => {
	let result = { success: false, errorCode: 403, message: '인증 토큰값이 없습니다!' };
	if (token) {
		jwt.verify(token, secret_key, (err, decoded) => {
			if (err) {
				result = { success: false, errorCode: 401, message: '인증 토큰값이 잘못되었습니다!' };
			}
	
			result = { success: true, token: token, decoded: decoded };
		});
	}
	return result;
};

exports.isLogged = (req, res, next) => {
	req.isLogged = false;
	req.isAdmin = false;

	// 보안을 위해 무조건 header에서 토큰값을 가져옴
	// let token = req.headers['x-access-token'] || req.body.accessToken || req.query.accessToken;
	let token = req.headers['x-access-token'];

	if (token) {
		let checkToken = verifyToken(token);

		if (checkToken.success) {
			// req.user에 담긴 값 - id: user.id, name: user.name, role: user.role, email: user.email
			req.user = checkToken.decoded;
			req.user.token = checkToken.token;

			User.findOne({ email: req.user.email }).then((user) => {
				if (user && (user.authToken === req.user.token)) {
					// populate 처리를 위한 _id값 저장
					req.user._id = user._id;
					req.isLogged = true;
					req.isAdmin = (user.role === 'admin') ? true : false;
				}
				next();
			}).catch((err) => {
				return res.status(500).json({ error: err });
			});
		}
	} else {
		next();
	}
};

exports.isAuthentication = (req, res, next) => {
	req.isLogged = false;
	req.isAdmin = false;

	let token = req.headers['x-access-token'];
	let checkToken = verifyToken(token);

	if (checkToken.success) {
		req.user = checkToken.decoded;
		req.user.token = checkToken.token;

		User.findOne({ email: req.user.email }).then((user) => {
			if (!user) {
				return res.status(404).json({ message: `가입된 회원이 아니거나 탈퇴한 회원입니다. (${req.user.email})` });
			}
	
			if (user.authToken !== req.user.token) {
				return res.status(401).json({ message: '인증 토큰값이 마지막 발급 인증 토큰값과 일치하지 않습니다!' });
			}

			req.user._id = user._id;
			req.isLogged = true;
			req.isAdmin = (user.role === 'admin') ? true : false;
			next();
		}).catch((err) => {
			return res.status(500).json({ error: err });
		});
	} else {
		return res.status(checkToken.errorCode).json({ message: checkToken.message });
	}
};

exports.isAdmin = (req, res, next) => {
	User.findOne({ email: req.user.email }).then((user) => {
		if (!user) {
			req.isAdmin = false
			return res.status(404).json({ message: `가입된 회원이 아니거나 탈퇴한 회원입니다. (${req.user.email})` });
		}

		if (user.role !== 'admin') {
			req.isAdmin = false
			return res.status(403).json({ message: '관리자 페이지 접근 권한이 없습니다!' });
		}

		next();
	}).catch((err) => {
		return res.status(500).json({ error: err });
	});
};
