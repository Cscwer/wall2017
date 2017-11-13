// msg.js
const mongoose = require('../connect'); 


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