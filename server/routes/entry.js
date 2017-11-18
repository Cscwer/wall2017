// entry.js
const express = require('express')
    , router = express.Router()
    , qs = require('querystring')
    , config = require('../config')
    , redirect_param = config.redirect_param
	, vwx = require('../utils/vwx')
	, { userModel } = require('../utils/db')
	, auth = require('../utils/auth')
	, R = require('../utils/redis')
	, qnx = require('../utils/qnx')
	, uuid = require('uuid/v1')
	, USER_AVATAR = 'user-avatar/'

// 微信用户授权的 URL 
let redirectTo = 
	'https://open.weixin.qq.com/connect/oauth2/authorize?' + 
	qs.stringify(redirect_param) + 
	'#wechat_redirect'; 


router.get('/', function(req, res, next) {
	// 如果带有reload查询 清空cookie 并强制授权 
	if (req.query.reload) {
		res.cookie('user-token', '', {
			expires: new Date('1984-01-01')
		});
		return res.redirect(redirectTo);
	}  

	// 否则判断cookie 
	if (req.cookies['user-token']){
		// 说明应该登录过 
		res.redirect('/');
	} else {
		res.redirect(redirectTo);
	}
});

// code 换取微信用户资料 
router.get('/code', function(req, res){
	// URL Such As: 
	// https://gw.chenpt.cc/?code=0814YGn215ypHM1afTn21zSHn214YGne&state=0 
	let { code } = req.query; 
	let openid ;

	vwx.code2user(code).then(user => {
		// User openid
		openid = user.openid; 

		// 创建用户
		// 并抓取用户头像到七牛 
		// （微信的头像链接会失效）
		return qnx.fetch(user.headimgurl, USER_AVATAR + uuid()).then(respBody => {
			user.headimgurl = respBody.url; 

			let data = new userModel(user); 

			return data.save()
		}); 
	}).then(user => {
		// 用户注册成功 
		// 设置 cookie 表示用户已经注册 
		let token = auth.en(user); 

		res.cookie('user-token', token, {
			expires: new Date('2017-11-28')
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
				console.log(`[ 用户重复 ]`); 

				let token = auth.en(user); 

				res.cookie('user-token', token, {
					expires: new Date('2017-11-28')
				})

				res.redirect('/'); 
			}); 
		} else {
			console.log(err);
			return Promise.reject(err); 
		}
	}).catch(err => {
        setTimeout(() => {
            res.cookie('user-token', '', {
                expires: new Date('2017-11-01')
            });
            res.redirect('/api/entry'); 
        }, 5000); 
	});
});

module.exports = router;
