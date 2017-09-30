// wish.js
const express = require('express')
    , router = express.Router()
    , { wishModel } = require('../utils/db')
    , rps = require('../utils/rps')

// 有分页
router.get('/', function(req, res){
	let N = 10; 
	let p = parseInt(req.query.p); 

	// 无效值用 0 代替 
	p = p || 0; 
	
	wishModel
		.find()
		.populate('who')
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
		}).catch(err => {
			console.log(err); 
			rps.send5005(res, {}, err);
		});
}); 

router.get('/detail', function(req, res){
	let _id = req.query._id; 

	wishModel.findOne({
		_id: _id
	}).populate('who').thne(doc => {
		rps.send2000(res, doc); 
	}).catch(err => {
		console.log(err); 
		if (err.name === 'ValidationError') {
			rps.send4000(res, req.body, err); 
		} else {
			rps.send5005(res, {}, err); 
		}
	});
}); 

router.post('/', function(req, res){
	let user = req.user; 

	// 取得 _id
	req.body.who = user._id; 

	if (user.sex !== 2){
		// 不是女性。。。 
		rps.send4101(res, {}); 
	} else {
		wishModel.saveAndCache(req.body).then(wish => {
			rps.send2000(res, wish);
		}).catch(err => {
			if (err.name === 'ValidationError') {
				rps.send4000(res, req.body, err); 
			} else {
				rps.send5005(res, {}, err); 
			}
		}); 
	}
}); 

module.exports = router;
