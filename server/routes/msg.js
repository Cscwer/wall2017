// user.js
const express = require('express')
    , router = express.Router()
    , rps = require('../utils/rps')
    , { msgModel } = require('../utils/db')
    , auth = require('../utils/auth')

// 查看留言
router.get('/', function(req, res){
	msgModel.find(req.query).then(docs => {
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
	}).catch(err => {
		rps.send5000(res, err); 
	})
});

// // 回复别人的留言
// router.post('/inner', function(req, res){
// 	let _id = req.body._id; 
	
// 	msgModel.find({
// 		_id: _id
// 	}).then(msg => {
// 		msg.
// 	})
// });


module.exports = router; 
