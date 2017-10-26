// system.js
const express = require('express')
    , router = express.Router()
    , rps = require('../utils/rps')
    , os = require('os')
    , { userModel } = require('../utils/db')
	, auth = require('../utils/auth')

router.get('/', function(req, res){
	res.render('system'); 
})

router.get('/usage', function(req, res){
	rps.send2000(res, {
		cpu: process.cpuUsage(), 
		mem: {
			total: os.totalmem() / 1024 / 1024 , 
			free: os.freemem() / 1024 / 1024
		}
	}); 
}); 



router.get('/clear-cookie', function(req, res){
	res.cookie('user-token', 'no~~', {
		expires: new Date()
	});


	res.render('msg', {
		msg: '已清空',
		data: {}
	});
}); 

router.get('/who-i-am', function(req, res){
	let token = req.cookies['user-token']; 

	auth.de(token).then(user => {
		res.render('who-i-am', {
			user: user
		}); 
	}, err => {
		res.render('msg', {
			msg: '那啥，解析你的 cookie 出错了，应该是没有cookie导致的', 
			data: {
				err: err,
				token: token || '没有token'
			}
		}); 
	});
})


router.get('/set-cookie', function(req, res){
	let _id = req.query._id; 

	userModel.findOne({
		_id: _id
	}).then(user => {
		if (user){
			// 生成 
			let token = auth.en(user); 

			res.cookie('user-token', token, {
				expires: new Date('2017-11-11')
			});

			res.render('msg', {
				msg: '设置成功', 
				data: {
					token: token,
					user: user
				}
			});
		} else {
			res.render('msg', {
				msg: '不存在的用户', 
				data: {}
			}); 
		}
	})
});


router.get('/user-select', function(req, res){
	userModel.find().then(users => {
		res.render('user-select', {
			users: users
		}); 
	})
}); 

module.exports = router; 
