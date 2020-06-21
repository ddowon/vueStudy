const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplaySchema = new Schema({
	REG_DT: { type: Date, required: true },
	VOD_TITLE: { type: String, required: true },
	PLAY_TIME: { type: String, required: true },
	VOD_FILE_ID: { type: String, required: true },
	AWARD_NO: { type: Number, required: true },
	IMG_FILE_URL: { type: String, required: true }
});

const Replay = mongoose.model('Replay', ReplaySchema);

module.exports = Replay;
