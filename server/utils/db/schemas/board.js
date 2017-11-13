// board.js
const mongoose = require('../connect')
    , msgSchema = require('./msg'); 

let boardSchema = mongoose.Schema({
	to: msgSchema
}); 


module.exports = boardSchema; 