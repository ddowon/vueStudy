const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connection = mongoose.createConnection(process.env.MONGODB_URI);

const PrizeSchema = new Schema({
	PRIZE_CD: { type: String, required: true },
	DIVISION: { type: String, required: true },
	PRIZE_NM: { type: String, required: true }
});

const Prize = connection.model('Prize', PrizeSchema);

module.exports = Prize;
