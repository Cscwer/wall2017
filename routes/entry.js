// entry.js
const express = require('express')
    , router = express.Router()
    , qs = require('querystring')
    , { redirect_param } = require('../config')


let redirectTo = 
	'https://open.weixin.qq.com/connect/oauth2/authorize?' + 
	qs.stringify(redirect_param) + 
	'#wechat_redirect'; 

router.get('/', function(req, res, next) {
	res.redirect(redirectTo);
});

module.exports = router;
