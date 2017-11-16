// wish.js
const express = require('express')
    , mongoose = require('mongoose')
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
    , IO = require('../../io')


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

router.post('/search', function(req, res){
	let { wishtype, q, area, p } = req.body; 
	q = q || ''; 
	// wishtype = wishtype.map(e => e.parseInt) || []; 
	// area = area || 0; 

	console.log(req.body); 

	let EXP = new RegExp(
		decodeURIComponent(q)
	); 


	let Q = wishModel.find({ text: EXP }); 


	if (wishtype.length !== 0) Q = Q.where('wishtype').in(wishtype); 
	
	if (area.length !== 0) Q = Q.where('area').in(area); 

	Q.populate('she').skip(p * N).limit(p).then(docs => {
		if (docs.length !== N){
			rps.send2001(res, docs); 
		} else {
			rps.send2000(res, docs); 
		}
	})


	// wishModel.find({
	// 	$or: [{
	// 		text: EXP,
	// 		wishtype: wishtype,
	// 		area: area,
	// 		status: 0
	// 	}]
	// }).populate('she').limit(N).then()
})

/***
 * 对应用户的愿望
 * @param p
 * @param status
 */
router.get('/user', function(req, res){
	let p = parseInt(req.query.p) || 0; 
	let userSex = req.query.sex || req.user.sex || BOY_FLAG; 
	let _id = req.query._id || req.user._id; 

	let mongoQuery = {
		status: parseInt(req.query.status) || 0
	}

	if (parseInt(userSex) === BOY_FLAG){
		mongoQuery.he  = mongoose.Types.ObjectId(_id); 
	} else {
		mongoQuery.she = mongoose.Types.ObjectId(_id); 
	}

	console.log(mongoQuery)

	wishModel.find(mongoQuery).populate('she').populate('he')
	.sort({
		created_at: -1
	})
	.skip(p * N)
	.limit(N).then(docs => {
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
	req.body.she  = user._id; 
	req.body.area = user.area; 

	if (user.sex !== GIRL_FLAG){
		// 不是女性。。。 
		rps.send4101(res, {}); 
	} else {
		req.body.he && delete req.body.he; 
		req.body.status && delete req.body.status; 

		let data = new wishModel(req.body);

		let temp = data.toObject();
		temp.she = user; 
		page.addOne(temp); 

		data.save().then(wish => {
			wish.she = req.user; 
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
 * 删除愿望 
 */
router.post('/delete', function(req, res){
	let user = req.user; 
	let _id = req.body._id; 

	one.find(_id).then(wish => {
		if (!wish) return rps.send4000(res, '此 id 不存在'); 
		if (wish.she._id.toString() !== user._id) return rps.send4000(res, '不是你的愿望'); 

		return one.remove(_id).then(ok => {
			rps.send2000(res, ok); 
			// 刷新缓存 
			page.cacheFlush();
		}) 
	}).catch(err => {
		rps.send5000(res, err); 
	})
})

/***
 * 领取
 */
router.post('/pull', function(req, res){
	let { io } = IO;
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
					let temp = JSON.parse(JSON.stringify(wish));
					temp.he = user; 

					// Server Push 
					IO.serverPush(wish.she, {
						type: 'wish-pull', 
						data: temp,
						msg: `你的愿望被 ${ user.nickname } 领走了 ~ ` ,
						create_at: Date.now()
					}); 

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
			console.log(wish, user); 

			if (wish.she._id == user._id){
				if (wish.status === 1){
					wish.status = 2; 

					return wish.save().then(ok => {
						// 2000: ok 
						rps.send2000(res, wish); 

						// 发送 Socket 
						IO.serverPush(wish.he, {
							type: 'wish-end', 
							data: wish,
							msg: `你成功实现了${wish.she.nickname}的愿望 ~ `,
							create_at: Date.now()
						}); 

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
