const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new Schema({
	id: { type: Number },
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true, unique: true },
	password: { type: String, required: true, default: '' },
	role: { type: String, default: 'member' },
	provider: { type: String, default: '' },
	authToken: { type: String, default: '' }
}, {
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
		paranoid: true,
		charset: 'utf8',
		collate: 'utf8_general_ci'
});

UserSchema.plugin(AutoIncrement, { id: 'user_counter', inc_field: 'id' });
const User = mongoose.model('User', UserSchema);

module.exports = User;
