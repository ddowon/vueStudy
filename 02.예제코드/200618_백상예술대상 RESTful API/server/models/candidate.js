const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(process.env.MONGODB_URI);
autoIncrement.initialize(connection);

const CandidateSchema = new Schema({
	PROGRAM_NM: { type: String, required: true },
	AWARD_NUM: { type: Number, required: true, default: 56 },
	PRIZE_CD: { type: String, required: true },
	DIVISION: { type: String, required: true },
	NAME: { type: String },
	PRIZE_NM: { type: String },
	PHOTO_URI: { type: String }
});

CandidateSchema.plugin(autoIncrement.plugin, { model: 'Candidate', field: 'ord', startAt: 1 });
const Candidate = connection.model('Candidate', CandidateSchema);

module.exports = Candidate;
