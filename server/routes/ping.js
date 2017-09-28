// ping.js
const express = require('express')
    , router = express.Router()


router.get('/', function(req, res){
	res.json({
		code: 200, 
		msg: 'hello coder, nice to code you', 
		data: req.cookies['user-token']
	});
})

module.exports = router; 
