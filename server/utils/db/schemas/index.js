// schemas.js
const mongoose = require('../connect'); 

let schemas = {}; 

schemas.user = mongoose.Schema({
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
	// EXTERNAL
	// bg: {
	// 	type: String,
	// 	default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAE0lEQVQImWPcvXv3fwYgYGKAAgAxOAM0xpONdQAAAABJRU5ErkJggg=='
	// }, 
	phone: {
		type: String, 
		max: 11, 
		default: '未设置'
	},
	created_at: {
		type: Date, 
		default: Date.now
	}
}, {
	skipVersioning: {
		dontVersionMe: true
	}
});

schemas.imgbase = mongoose.Schema({
	who: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user', 
		required: true
	}, 
	img: {
		type: String, 
		required: true
	}, 
	created_at: {
		type: Date, 
		default: Date.now
	},
	deleted: {
		type: Boolean, 
		default: false
	}
})

module.exports = schemas; 
