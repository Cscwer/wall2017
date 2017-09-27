const express = require('express')
    , router = express.Router()
    , all = require('./all')
    , entry = require('./entry')
    , login = require('./login')

router.use('/entry', entry);

// 跨域 
router.use('*', all);

// 登录 
router.use('/login', login); 

module.exports = router;
