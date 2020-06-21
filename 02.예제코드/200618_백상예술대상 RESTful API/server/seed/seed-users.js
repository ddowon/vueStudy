require(process.cwd() + '/lib/connection');

const mongoose = require('mongoose');
const User = require('../models/user');
const JSON_USERS = require('./users.json');

// map, forEach를 사용하면 connection 에러 발생
// insertMany를 사용하면 sequence duplicate 오휴 발생
// for 돌려서 save()로 데이터 집어 넣어야 함
var done = 0;
for (var i = 0; i < JSON_USERS.length; i++) {
	var user = new User(JSON_USERS[i]);
	user.save().then(function (result) {
		done++;
		if (done === JSON_USERS.length) {
			console.log(`JSON_USERS 초기 데이터 입력 완료!`);
			exit();
		}
	}).catch(function (err) {
		console.log(err);
		console.log(`JSON_USERS 초기 데이터를 입력하는 데 에러가 발생했습니다.`);
	});
}

function exit() {
	mongoose.disconnect();
}