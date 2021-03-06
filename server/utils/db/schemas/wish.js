// wish.js
const mongoose = require('../connect'); 


let wishSchema = mongoose.Schema({
	she: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user', 
		required: true
	}, 
	he: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'user'
	}, 
	text: {
		type: String, 
		default: ''
	}, 
	img: {
		type: String
	},
	area: {
		type: Number, 
		default: 0
	},
	// Status: 
	// 0 =>  待领取 
	// 1 =>  待实现 
	// 2 =>  已完成 
	status: {
		type: Number,
		default: 0, 
		min: 0, 
		max: 2
	},
	wishtype: {
		type: Number,
		default: 0, 
		min: 0, 
		max: 1
	},
	created_at: {
		type: Date, 
		default: Date.now
	},
}); 


wishSchema.query.nextStatus = function(_id){
	return this.update({
		_id: _id
	}, {
		$inc: {
			status: 1
		}
	});
}

module.exports = wishSchema; 