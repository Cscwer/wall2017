const express = require('express')
    , router = express.Router()
    , all = require('./all')
    , entry = require('./entry')
    // , login = require('./login')

// Set Token 
router.use('/entry', entry);

// Get Data Of Token 
router.use('*', all);

router.use('*', function(req, res, next){
	console.log('\n\n'); 

	console.log('[ USER ]', req.user); 

	next(); 
}); 


// 登录 
// router.use('/login', login); 

module.exports = router;
