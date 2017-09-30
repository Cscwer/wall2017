// user.js
const express = require('express')
    , router = express.Router()
    , rps = require('../utils/rps')
    , { userModel } = require('../utils/db')
    , auth = require('../utils/auth')

router.get('/me', function(req, res, next){
	rps.send2000(res, req.user); 
});

router.get('/', function(req, res){
	let N = 10; 
	let { q } = req.query; 

	let EXP = new RegExp(q); 

	userModel.find({
		$or: [{
			phone: EXP
		}, {
			nickname: EXP
		}]
	}).limit(N).then(docs => {
		rps.send2000(res, docs); 
	})
});

router.post('/update', function(req, res){
	let user_id = req.user._id; 
	let token = req.cookies['user-token']; 

	let body = req.body; 

	userModel.updateOneAndCache({
		_id: user_id
	}, req.body).then(newUser => {
		let newToken = auth.en(newUser); 

		res.cookie('user-token', newToken, {
			expires: new Date('2017-11-11')
		});

		rps.send2000(res, newUser); 
	}).catch(err => {
		console.log(err); 
		rps.send5099(res, err); 
	});
}); 

module.exports = router; 
