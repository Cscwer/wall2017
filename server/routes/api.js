const express = require('express')
    , router = express.Router()
    , all = require('./all')
    , entry = require('./entry')
    , ping = require('./ping')
    , user = require('./user')
    , ta = require('./ta')
    , wish = require('./wish')
    , music = require('./music')
    // , login = require('./login')

// Set Token 
router.use('/entry', entry);

// Get Data Of Token 
router.use('*', all);

// Normal Router 
router.use('/ping', ping); 
router.use('/user', user); 
router.use('/ta', ta); 
router.use('/wish', wish); 
router.use('/music', music);

router.use('*', function(req, res, next){
	console.log('\n\n'); 

	console.log('[ USER ]', req.user); 

	next(); 
}); 


// 登录 
// router.use('/login', login); 

module.exports = router;
