const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connection = mongoose.createConnection(process.env.MONGODB_URI);

const ReplaySchema = new Schema({
	REG_DT: { type: Date, required: true },
	VOD_TITLE: { type: String, required: true },
	PLAY_TIME: { type: String, required: true },
	VOD_FILE_ID: { type: String, required: true },
	AWARD_NO: { type: Number, required: true },
	IMG_FILE_URL: { type: String, required: true }
});

const Replay = connection.model('Replay', ReplaySchema);

module.exports = Replay;
