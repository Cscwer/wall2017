// user.js
const mongoose = require('../connect'); 

let userSchema = mongoose.Schema({
	// WX_USER_INFO
	openid: {
		type: String, 
		required: true,
		// 唯一性保障
		unique: true
	},
	nickname: {
		type: String, 
		required: true
	},
	sex: {
		type: Number, 
		required: true
	},
	headimgurl: {
		type: String, 
		required: true
	},
	phone: {
		type: String, 
		max: 11, 
		default: '未设置'
	},
	weid: {
		tpye: String
	},
	created_at: {
		type: Date, 
		default: Date.now
	}
});

module.exports = userSchema; 
