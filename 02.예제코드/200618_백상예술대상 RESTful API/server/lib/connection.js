const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'production') {
	dotenv.config({ path: path.join(__dirname, '../.env.production') });
	console.log('프로덕션 모드 접속 완료!');
} else if (process.env.NODE_ENV === 'development') {
	dotenv.config({ path: path.join(__dirname, '../.env.development') });
	console.log('개발 모드 접속 완료!');
	mongoose.set('debug', true);
}

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false }, (err) => {
	if (err) {
		return console.log('데이터베이스에 접속하는 중 문제가 발생했습니다!' + err);
	}
	console.log('데이터베이스 접속 성공!');
});

db.on('error', () => {
	console.log('통신 오류가 발생했습니다!');
});

db.on('disconnected', () => {
	console.log('연결이 끊겼습니다. 연결을 재시도합니다.');
});

process.on('SIGINT', () => {
	db.close(() => {
		console.log('데이터베이스 접속이 해제되었습니다.');
		process.exit(0);
	});
});