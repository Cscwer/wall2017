// connect.js
const mongoose = require('mongoose')
    , { mongoUri } = require('./db-config')

// Connect 
mongoose.connect(mongoUri); 

module.exports = mongoose; 
