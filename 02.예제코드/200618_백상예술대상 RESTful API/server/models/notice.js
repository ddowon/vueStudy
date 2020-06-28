const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const NoticeSchema = new Schema({
	id: { type: Number },
	title: { type: String, trim: true, required: true },
	contents: { type: String, trim: true, required: true },
	writer: { type: String, ref: 'User' },
	comments: [{
		contents: { type: String, trim:true, required: true },
		writer: { type: String, ref: 'User' },
		likes: { type: Number, default: 0 },
		created_at: { type: Date, default: Date.now }
	}],
	files: { type: [] },
	views: { type: Number, default: 0 },
	likes: { type: Number, default: 0 },
	tags: { type: [] }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

NoticeSchema.plugin(mongoosePaginate);
NoticeSchema.plugin(AutoIncrement, { id: 'notice_counter', inc_field: 'id' });
const Notice = mongoose.model('Notice', NoticeSchema);

module.exports = Notice;
