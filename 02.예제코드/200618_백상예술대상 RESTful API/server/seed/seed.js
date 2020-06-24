require(process.cwd() + '/lib/connection');

const mongoose = require('mongoose');
const Prize = require('../models/prize');
const Candidate = require('../models/candidate');
const Winner = require('../models/winner');
const Replay = require('../models/replay');

const JSON_PRIZES = require('./prizes.json');
const JSON_CANDIDATES = require('./candidates.json');
const JSON_WINNERS = require('./winners.json');
const JSON_REPLAYS = require('./replays.json');

Prize.count({}, (err, count) => {
	console.log('Prize 데이터 수: ', count);

	if (count === 0) {
		Prize.insertMany(JSON_PRIZES)
			.then((docs) => {
				if (docs) {
					console.log('JSON_PRIZES 초기 데이터 입력 완료!');
				}
			})
			.catch((err) => {
				console.log(err);
				console.log('JSON_PRIZES 초기 데이터를 입력하는 데 에러가 발생했습니다.');
			});
	}
});

Candidate.count({}, (err, count) => {
	console.log('Candidate 데이터 수: ', count);

	if (count === 0) {
		Candidate.insertMany(JSON_CANDIDATES)
			.then((docs) => {
				if (docs) {
					console.log('JSON_CANDIDATES 초기 데이터 입력 완료!');
				}
			})
			.catch((err) => {
				console.log(err);
				console.log('JSON_CANDIDATES 초기 데이터를 입력하는 데 에러가 발생했습니다.');
			});
	}
});

Winner.count({}, (err, count) => {
	console.log('Winner 데이터 수: ', count);

	if (count === 0) {
		Winner.insertMany(JSON_WINNERS)
			.then((docs) => {
				if (docs) {
					console.log('JSON_WINNERS 초기 데이터 입력 완료!');
				}
			})
			.catch((err) => {
				console.log(err);
				console.log('JSON_WINNERS 초기 데이터를 입력하는 데 에러가 발생했습니다.');
			});
	}
});

Replay.count({}, (err, count) => {
	console.log('Replay 데이터 수: ', count);

	if (count === 0) {
		Replay.insertMany(JSON_REPLAYS)
			.then((docs) => {
				if (docs) {
					console.log('JSON_REPLAYS 초기 데이터 입력 완료!');
				}
			})
			.catch((err) => {
				console.log(err);
				console.log('JSON_REPLAYS 초기 데이터를 입력하는 데 에러가 발생했습니다.');
			});
	}
});

function exit() {
	mongoose.disconnect();
}