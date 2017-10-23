// wish.js
const express = require('express')
    , router = express.Router()
    , { wishModel } = require('../../utils/db')
    , rps = require('../../utils/rps')
    , R = require('../../utils/redis')
    , page = require('./page')
    , WISH_LIST_NS = 'WISH-LIST'
    , N = 10

// Init Queue 
wishModel.find({
	status: 0
}).populate('she').sort({
	created_at: -1
}).limit(N * 100).then(list => {
	return R.initQueue(WISH_LIST_NS, list); 
})

function find(p){

	return R.page(WISH_LIST_NS, p, N).then(arr => {
		if (arr.length === 0){
			return wishModel
				.find({
					status: 0
				})
				.populate('she')
				.sort({
					created_at: -1
				})
				.skip(p * N)
				.limit(N)
		} else {
			return arr; 
		}
	})
}


router.get('/', function(req, res){
	let p = parseInt(req.query.p) || 0
	
	// 数据库查询 
	// wishModel
	// 	.find({
	// 		status: 0
	// 	})
	// 	.populate('she')
	// 	.sort({
	// 		created_at: -1
	// 	})
	// 	.skip(p * N)
	// 	.limit(N)

	// find 
	find(p).then(docs => {
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
	}).populate('she').thne(doc => {
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



router.all('*', function(req, res, next){
	if (req.user.sex === 0){
		return rps.send4103(res, {}); 
	} else {
		next(); 
	}
}); 

router.post('/', function(req, res){
	let user = req.user; 

	// 取得 _id
	req.body.she = user._id; 

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
