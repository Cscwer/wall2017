// wish.js
const express = require('express')
    , router = express.Router()
    , { wishModel } = require('../../utils/db')
    , rps = require('../../utils/rps')
    , R = require('../../utils/redis')
    , page = require('./page')
    , one = require('./one')
    // 常数 
    , WISH_LIST_NS = 'WISH-LIST'
    , N = 10
    , GIRL_FLAG = 2
    , BOY_FLAG = 1
    , NOT_FLAG = 0

/***
 * 首页 
 * @param p
 */
router.get('/', function(req, res){
	let p = parseInt(req.query.p) || 0

	page.find(p).then(docs => {
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

/***
 * 愿望详情
 * @param _id
 */
router.get('/detail', function(req, res){
	let _id = req.query._id; 

	one.find(_id).then(doc => {
		rps.send2000(res, doc); 
	}).catch(err => {
		console.log(err); 
		if (err.name === 'ValidationError') {
			rps.send4000(res, req.body, err); 
		} else {
			rps.send5005(res, {}, err); 
		}
	});
	// wishModel.findOne({
	// 	_id: _id
	// }).populate('she')
	//   .populate('he')
}); 

/***
 * 未设置性别的会被弹出 
 */
router.all('*', function(req, res, next){
	if (req.user.sex === NOT_FLAG){
		return rps.send4103(res, {}); 
	} else {
		next(); 
	}
}); 

/***
 * 创建愿望
 */
router.post('/', function(req, res){
	let user = req.user; 

	// 取得 _id
	req.body.she = user._id; 

	if (user.sex !== GIRL_FLAG){
		// 不是女性。。。 
		rps.send4101(res, {}); 
	} else {
		req.body.he && delete req.body.he; 
		req.body.status && delete req.body.status; 

		let data = new wishModel(req.body);

		data.save().then(wish => {
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

/***
 * 领取
 */
router.post('/pull', function(req, res){
	let user = req.user; 
	let _id = req.body._id; 

	if (user.sex !== BOY_FLAG) return rps.send4106(res); 

	wishModel.findOne({
		_id: _id
	})
	.populate('she')
	.then(wish => {
		if (wish){
			if (wish.status === 0){
				wish.status = 1; 
				wish.he = req.user._id; 

				return wish.save().then(ok => {
					rps.send2000(res, ok); 

					// User 
					wish.he = user; 
					return one.set(_id, wish);
				}); 
			} else {
				rps.send4108(res, wish); 
			}
		} else {
			rps.send4000(res, '此 id 对应愿望不存在'); 
		}
	})
})

/***
 * 确认完成
 */
router.post('/end', function(req, res){
	let user = req.user; 
	let _id = req.body._id; 

	if (user.sex !== GIRL_FLAG) return rps.send4107(res); 

	wishModel.findOne({
		_id: _id
	})
	.populate('she')
	.populate('he')
	.then(wish => {
		if (wish){
			if (wish.she.toString() === user._id){
				if (wish.status === 1){
					wish.status = 2; 

					return wish.save().then(ok => {
						// 2000: ok 
						rps.send2000(res, wish); 

						return one.set(_id, wish);
					})
				} else {
					// 状态不对 必须要 2 
					rps.send4105(res, wish); 
				}
			} else {
				// 此愿望不是 user 的 
				rps.send4107(res);
			}
		} else {
			// 不存在 
			rps.send4000(res, '此 id 对应愿望不存在'); 
		}
	})
})

module.exports = router;
