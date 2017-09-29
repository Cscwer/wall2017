// entry.js
const express = require('express')
    , router = express.Router()
    , qs = require('querystring')
    , redirect_param = {
		appid: 'wxca79087c2e5cf375', 
		redirect_uri: 'http://gw.chenpt.cc/api/entry/code', 
		response_type: 'code', 
		scope: 'snsapi_userinfo',
		state: '0' 
	}
	, vwx = require('../utils/vwx')
	, { userModel } = require('../utils/db')
	, auth = require('../utils/auth')
	, R = require('../utils/redis')


let redirectTo = 
	'https://open.weixin.qq.com/connect/oauth2/authorize?' + 
	qs.stringify(redirect_param) + 
	'#wechat_redirect'; 


router.get('/', function(req, res, next) {
	if (req.cookies['user-token']){
		// 说明应该登录过 
		res.redirect('/');
	} else {
		res.redirect(redirectTo);
	}
});

router.get('/code', function(req, res){
	// URL Such As: 
	// https://gw.chenpt.cc/?code=0814YGn215ypHM1afTn21zSHn214YGne&state=0 
	let { code } = req.query; 
	let openid ;

	vwx.code2user(code).then(user => {
		// User openid
		openid = user.openid; 

		let data = new userModel(user); 

		return data.save()
	}).then(user => {
		// 用户注册成功 
		// 设置 cookie 表示用户已经注册 
		let token = auth.en(user); 

		res.cookie('user-token', token, {
			expires: new Date('2017-11-11')
		});
		res.redirect('/'); 
	}, err => {
		// 可能的错误： 
		// 1. 数据库重复项 err.code === 11000 
		// 2. 数据校验失败 
		// 3. 数据库内部错误 
		if (err.code === 11000){
			return userModel.findOne({
				openid: openid
			}).then(user => {
				console.log(`用户重复`)

				let token = auth.en(user); 

				res.cookie('user-token', token, {
					expires: new Date('2017-11-11')
				})

				res.redirect('/'); 
			}); 
		} else {
			console.log(err);

			return Promise.reject(err); 
		}
	}).catch(err => {
		console.log(err); 
		res.json({
			code: 500, 
			err: err
		});
	})
});

module.exports = router;
