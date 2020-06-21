const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WinnerSchema = new Schema({
	PROGRAM_NM: { type: String, required: true },
	AWARD_NUM: { type: Number, required: true, default: 56 },
	DIVISION: { type: String, required: true },
	NAME: { type: String },
	PRIZE_NM: { type: String },
	PHOTO_URI: { type: String }
});

const Winner = mongoose.model('Winner', WinnerSchema);

module.exports = Winner;
