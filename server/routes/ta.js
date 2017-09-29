// ta.js
const express = require('express')
    , router = express.Router()
    , { taModel } = require('../utils/db')
    , rps = require('../utils/rps')

router.get('/', function(req, res){
	let from = req.user._id; 

	taModel.findOne({
		from: from
	}).populate(['from', 'to']).then(doc => {
		rps.send2000(res, doc); 
	})
}); 

router.get('/pingpong', function(req, res){
	let _id = req.user._id; 

	taModel.pingpong(req.user._id).then(ta => {
		rps.send2000(res, ta);
	})
})

module.exports = router; 
