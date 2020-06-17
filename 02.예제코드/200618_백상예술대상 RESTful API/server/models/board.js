const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(process.env.MONGODB_URI);
autoIncrement.initialize(connection);

const BoardSchema = new Schema({
	subject: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: false },
	content: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

BoardSchema.plugin(autoIncrement.plugin, { model: 'Board', field: 'id', startAt: 1 });
const Board = connection.model('Board', BoardSchema);

module.exports = Board;
