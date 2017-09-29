// ta.js
// 暗恋匹配的表 
const mongoose = require('../connect'); 

let taSchema = mongoose.Schema({
	// left 暗恋 right
	from: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user', 
		required: true, 
		unique: true
	}, 
	// left 被 right 暗恋着
	to: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user', 
		required: true
	}, 
	created_at: {
		type: Date, 
		default: Date.now
	}
});

module.exports = taSchema
