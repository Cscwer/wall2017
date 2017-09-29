// user.js
const express = require('express')
    , router = express.Router()
    , rps = require('../utils/rps')

router.get('/me', function(req, res, next){
	rps.send2000(res, req.user); 
});

module.exports = router; 

