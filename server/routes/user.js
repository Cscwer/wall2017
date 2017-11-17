// user.js
const express = require('express')
    , router = express.Router()
    , rps = require('../utils/rps')
    , { userModel, wishModel } = require('../utils/db')
    , auth = require('../utils/auth')

router.get('/me', function(req, res, next){
	if (req.query._id){
		userModel.findOne({
			_id: req.query._id
		}).then(doc => {
			rps.send2000(res, doc); 
		})
	} else {
		rps.send2000(res, req.user); 
	}
});

router.get('/', function(req, res){
	let N = 10; 
	let q = decodeURIComponent(req.query.q); 

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

router.post('/init_sex', function(req, res){
	let user = req.user; 

	let toUpdate = {
		sex: parseInt(req.body.sex)
	}

	if (user.sex === 0){
		userModel.updateOneAndCache({
			_id: user._id
		}, toUpdate).then(newUser => {
			let newToken = auth.en(newUser); 

			res.cookie('user-token', newToken, {
				expires: new Date('2017-11-28')
			});

			rps.send2000(res, newUser); 
		}).catch(err => {
			console.log(err); 
			rps.send5099(res, err); 
		});
	} else {
		rps.send4000(res, '你已设置过性别 无须设置'); 
	}
})

router.post('/update', function(req, res){
	let user_id = req.user._id; 
	let token = req.cookies['user-token']; 

	let body = req.body; 

	userModel.updateOneAndCache({
		_id: user_id
	}, req.body).then(newUser => {
		let newToken = auth.en(newUser); 

		res.cookie('user-token', newToken, {
			expires: new Date('2017-11-28')
		});

		rps.send2000(res, newUser); 
	}).catch(err => {
		console.log(err); 
		rps.send5099(res, err); 
	});
}); 

router.get('/wish', function(req, res){
	let user_id = req.query._id
	  , N = 10
	  , query = {}
	  , p = req.query.p || 0

	userModel.findInCache(user_id).then(user => {
		// console.log('Find User', user._id); 

		if (user.sex === 0){
			// 该用户没有设置性别 ~ 无法访问
			return rps.send4104(res, {}); 
		} else if (user.sex === 1){
			// boy's wish 
			query.he = user_id; 
		} else {
			// Girl's wish 
			query.she = user_id; 
		}

		// 待领取 实现中 已实现 
		if (req.query.status) query.status = req.query.status; 


		return wishModel
			.find(query)
			.populate('she')
			.sort({
				created_at: -1
			})
			.skip(p * N)
			.limit(N)
			.then(docs => {
				if (docs.length !== N){
					rps.send2001(res, docs); 
				} else {
					rps.send2000(res, docs); 
				}
			})
	}).catch(err => {
		console.log(err); 
		rps.send5005(res, {}, err);
	});
});

module.exports = router; 
