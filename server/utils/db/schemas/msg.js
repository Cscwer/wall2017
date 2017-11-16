// msg.js
const mongoose = require('../connect'); 

let innerSchema = mongoose.Schema({
	from: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'user',
		required: true
	},
	headimgurl: {
		type: String
	},
	area: {
		type: Number, 
		default: 0
	},
	nickname: {
		type: String,
		default: '匿名用户'
	},
	content: {
		type: String, 
		required: true
	},
	created_at: {
		type: Date, 
		default: Date.now
	}
})

let msgSchema = mongoose.Schema({
	from: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user', 
		required: true
	}, 
	to: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user', 
		required: true
	}, 
	inner: [innerSchema],
	content: {
		type: String, 
		min: 3, 
		max: 2048
	}, 
	created_at: {
		type: Date, 
		default: Date.now
	}
}); 


module.exports = msgSchema; 