// ta.js
const express = require('express')
    , router = express.Router()
    , { taModel, userModel } = require('../utils/db')
    , R = require('../utils/redis')
    , rps = require('../utils/rps')

router.get('/', function(req, res){
	let from = req.user._id; 

	taModel.findOne({
		from: from
	}).populate(['from', 'to']).then(doc => {
		rps.send2000(res, doc); 
	});
}); 

router.post('/', function(req, res){
	// from 字段
	let from = req.user._id; 
	req.body.from = from; 

	// let { from } = req.body; 

	if (from === req.body.to){
		// 请勿暗恋自己喔 
		rps.send4100(res, req.body); 
	} else {
		// 保存
		taModel.saveAndCache(req.body).then(suc => {
			rps.send2000(res, suc); 
		}).catch(err => {
			if (err.code === 11000){
				rps.send4005(res); 
			} else {
				rps.send5000(res, {}, err); 	
			}
		}); 
	}
});

// router.post('/update', function(req, res){

// });

router.get('/pingpong', function(req, res){
	let _id = req.user._id; 

	taModel.pingpong(req.user._id).then(ta => {
		rps.send2000(res, ta);
	})
}); 



module.exports = router; 
