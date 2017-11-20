// all.js
const express = require('express')
    , router = express.Router()
    , R = require('../utils/redis')
    , { userModel, banModel } = require('../utils/db')
    , auth = require('../utils/auth')

var banList = {};

banModel.find({}).then(list => {
	list.forEach(e => {
		banList[e.user.toString()] = true; 
	}); 
})


// 设置跨域访问
module.exports = function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, auth");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' NIGHTCH@EXPRESS'); 
	res.header("Content-Type", "application/json;charset=utf-8");
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");

	if (req.method === "OPTIONS") {
		res.sendStatus(200);
	} else {
		let token = req.cookies['user-token']; 

		if (token){
			auth.de(token).then(user => {
				req.user = user;
				if (banList[user._id.toString()]){
					// res.redirect(); 
					res.json({
						code: -1
					})
				} else {
					next(); 
				}
			}, invalid => {
				res.redirect('/api/entry?reload=true'); 
			}); 
		} else {
			res.redirect('/api/entry?reload=true'); 
		}
	}
}
