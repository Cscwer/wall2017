// ohmygod.js
const express = require('express')
	, md5 = require('md5')
	, R = require('../utils/redis')
    , { userModel, banModel } = require('../utils/db')
    , router = express.Router()

router.use('*', function(req, res, next){
	if (md5(req.query.pwd) === md5('asd123')){
		next()
	} else {
		res.json({
			msg: 'pwd error'
		}); 
	}
})

router.get('/find-user', function(req, res){
	userModel.findOne(req.query).then(user => {
		res.json({
			code: 2000, 
			data: user
		})
	})
})

router.get('/add-ban', function(req, res){
	let _id = req.query._id; 

	var ban = new banModel({
		user: _id
	});

	ban.save().then(ok => {
		res.json({
			msg: 'ok'
		})
	}).catch(err => {
		res.json({
			code: 500, 
			msg: err
		}); 
	})
})

module.exports = router; 