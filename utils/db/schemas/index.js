// schemas.js
const mongoose = require('./connect'); 

let schemas = {}; 

schemas.user = mongoose.Schema({
	openId: {
		type: String, 
		required: true
	},
	nickName: {
		type: String, 
		required: true
	},
	gender: {
		type: Number, 
		required: true
	},
	avatarUrl: {
		type: String, 
		required: true
	},
	bg: {
		type: String,
		default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAE0lEQVQImWPcvXv3fwYgYGKAAgAxOAM0xpONdQAAAABJRU5ErkJggg=='
	}, 
	blog: {
		type: String, 
		required: true, 
		default: 'blog no set'
	}, 
	phone: {
		type: String, 
		max: 11, 
		default: '未设置'
	},
	work_day: [{
		type: String
	}], 
	ps: {
		type: String, 
		default: '这个叼毛没有签名 ~ '
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

schemas.mp3 = mongoose.Schema({
	url: {
		type: String, 
		required: true
	}, 
	picture: {
		type: String, 
		required: true
	},
	info: {
		type: Object
	}, 
	who: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user', 
		required: true
	},
	created_at: {
		type: Date, 
		default: Date.now
	}
})

module.exports = schemas; 
