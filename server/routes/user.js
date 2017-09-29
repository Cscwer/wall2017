// user.js
const express = require('express')
    , router = express.Router()
    , rps = require('../utils/rps')
    , { userModel } = require('../utils/db')

router.get('/me', function(req, res, next){
	rps.send2000(res, req.user); 
});

router.get('/', function(req, res){
	let { q } = req.query; 

	let EXP = new RegExp(q); 

	userModel.find({
		$or: [{
			phone: EXP
		}, {
			nickname: EXP
		}]
	}).then(docs => {
		rps.send2000(res, docs); 
	})
})

module.exports = router; 

