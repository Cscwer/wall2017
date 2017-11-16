// proxy.js
const express = require('express')
    , router = express.Router()

router.get('/', function(req, res){
	res.render('proxy'); 
})

module.exports = router; 
