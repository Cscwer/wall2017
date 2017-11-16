// user.js
const express = require('express')
    , router = express.Router()
    , rps = require('../utils/rps')
    , { msgModel } = require('../utils/db')
    , auth = require('../utils/auth')
    , IO = require('../io'); 

// 查看留言
router.get('/', function(req, res){
	msgModel.find(req.query).populate('from').populate('to').then(docs => {
		rps.send2000(res, docs); 
	}).catch(err => {
		rps.send5000(res, err); 
	}); 
});

// 留言
router.post('/', function(req, res){
	let input = {
		from: req.user._id, 
		to: req.body.to,
		content: req.body.content
	}

	let data = new msgModel(input); 

	data.save().then(ok => {
		rps.send2000(res, ok); 
		let temp = ok.toObject();
		temp.from = req.user; 

		IO.serverPush(req.body.to, {
			type: 'person-in-msg', 
			data: temp,
			msg: req.body.content,
			create_at: Date.now()
		}); 
	}).catch(err => {
		rps.send5000(res, err); 
	})
});

// // 回复别人的留言
router.post('/inner', function(req, res){
	let _id = req.body._id; 
	
	msgModel.findOne({
		_id: _id
	}).then(msg => {
		if (!msg){
			// no good 
			rps.send4000(res, req.body); 
		} else {
			let temp = {
				from: req.user._id,
				nickname: req.user.nickname, 
				content: req.body.content,
				headimgurl: req.body.headimgurl,
				area: req.body.area
			}

			msg.inner.push(temp); 

			return msg.save().then(ok => {
				rps.send2000(res, temp); 
			}); 
		}
	}).catch(err => {
		console.log('ERR', err); 
		rps.send5000(res, err); 
	})
});


module.exports = router; 
