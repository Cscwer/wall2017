// all.js
const express = require('express')
    , router = express.Router()

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
		next();
	}
}
