// proxy.js
const express = require('express')
    , router = express.Router()

router.get('/', function(req, res){
	// res.render('proxy'); 
	res.redirect('/api/entry'); 
})

module.exports = router; 
