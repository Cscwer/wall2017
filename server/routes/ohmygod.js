// ohmygod.js
const express = require('express')
	, md5 = require('md5')
	, R = require('../utils/redis')
    , { userModel, banModel, taModel, msgModel, wishModel } = require('../utils/db')
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
	delete req.query.pwd; 
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

router.get('/db', function(req, res){
	var db = {
		userModel, banModel, taModel, msgModel, wishModel
	}

	Promise.all([
		Object.keys(db).map(key => {
			let model = db[key]; 

			return model.find().exec(); 
		})
	]).then(allRes => {
		rps.send2000(res, allRes); 
	})
})

module.exports = router; 