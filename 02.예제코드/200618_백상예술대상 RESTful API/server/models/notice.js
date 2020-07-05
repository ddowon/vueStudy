const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const NoticeSchema = new Schema({
	id: { type: Number },
	ip: { type: String, default: '' },
	author: { type: Schema.Types.ObjectId, ref: 'User', default: null },
	title: { type: String, trim: true, required: true },
	contents: { type: String, trim: true, required: true },
	comments: [{ type: Schema.Types.ObjectId, ref: 'Notice_Comment' }],
	files: { type: [] },
	cnt: {
		comment: { type: Number, default: 0 },
		view: { type: Number, default: 0 },
		like: { type: Number, default: 0 }
	},
	tags: { type: [] }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

NoticeSchema.plugin(mongoosePaginate);
NoticeSchema.plugin(AutoIncrement, { id: 'notice_counter', inc_field: 'id' });
const Notice = mongoose.model('Notice', NoticeSchema);

module.exports = Notice;
