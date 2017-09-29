// connect.js
const mongoose = require('mongoose')
    , { mongoUri } = require('./db-config')

// 使用原生 Promise 
mongoose.Promise = Promise

// Connect 
mongoose.connect(mongoUri); 

module.exports = mongoose; 
