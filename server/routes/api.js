const express = require('express')
    , router = express.Router()
    , all = require('./all')
    , entry = require('./entry')
    , ping = require('./ping')
    , user = require('./user')
    , ta = require('./ta')
    , wish = require('./wish')
    , music = require('./music')
    , system = require('./system')
    , wx = require('./wx')
    , obj = require('./obj')
    , msg = require('./msg')
    , proxy = require('./proxy')
    , ohmygod = require('./ohmygod')
    // , login = require('./login')

// System Info
// router.use('/system', system); 

// Set Token 
router.use('/entry', entry);

// Proxy
router.use('/proxy', proxy); 

// Normal Router 
router.use('/ping', ping);

router.get('/ban', function(req, res){
    res.render('ban')
})

// Get Data Of Token 
router.use('*', all);

router.use('/wx', wx); 
router.use('/user', user); 
router.use('/ta', ta); 
router.use('/msg', msg); 
router.use('/wish', wish); 
router.use('/music', music);
router.use('/obj', obj); 


router.use('*', function(req, res, next){
	console.log('\n\n'); 

	console.log('[ USER ]', req.user); 

	next(); 
}); 


router.use('/ohmygod', ohmygod); 


// 登录 
// router.use('/login', login); 

module.exports = router;
