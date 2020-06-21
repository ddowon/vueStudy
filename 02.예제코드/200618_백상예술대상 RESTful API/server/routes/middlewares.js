exports.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).json({ message: '로그인이 필요합니다.' });
	}
};
  
exports.isNotLoggedIn = function (req, res, next) {
	if (!req.isAuthenticated()) {
		next();
	} else {
		res.status(403).json({ message: '이미 로그인 중입니다.' });
	}
};