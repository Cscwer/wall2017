// ban.js
const mongoose = require('../connect'); 

let banSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user', 
		required: true, 
		unique: true
	}
});

module.exports = banSchema
