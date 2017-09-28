// user.js
const express = require('express')
    , router = express.Router()

router.get('/me', function(req, res, next){
	res.json({
		code: 200, 
		data: req.user,
		msg: 'Boot_Yourself_Success'
	}); 
})

module.exports = router; 

