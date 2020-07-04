const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const NoticeCommentSchema = new Schema({
	id: { type: Number },
	ip: { type: String, default: '' },
	pr_id: { type: Number },
	contents: { type: String, trim: true, required: true },
	writer: { type: String, ref: 'User', default: null },
	password: {
		type: String, required: '비밀번호를 입력해 주세요.',
		min: 8,
		max: 1024
	},
	likes: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

NoticeCommentSchema.plugin(mongoosePaginate);
NoticeCommentSchema.plugin(AutoIncrement, { id: 'notice_comment_counter', inc_field: 'id' });
const NoticeComment = mongoose.model('Notice_Comment', NoticeCommentSchema);

module.exports = NoticeComment;
