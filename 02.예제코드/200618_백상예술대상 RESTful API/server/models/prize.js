const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrizeSchema = new Schema({
	PRIZE_CD: { type: String, required: true },
	DIVISION: { type: String, required: true },
	PRIZE_NM: { type: String, required: true }
});

const Prize = mongoose.model('Prize', PrizeSchema);

module.exports = Prize;
