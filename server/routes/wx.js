// wx.js
const express = require('express')
    , router = express.Router()
    , rps = require('../utils/rps')
    , vwx = require('../utils/vwx')

router.get('/config', function(req, res){
	let url = decodeURIComponent(req.query.url); 

	vwx.sdk.wxConfig(url).then(result => {
		console.log(url)
		rps.send2000(res, result); 	
	}); 
}); 

router.get('/img', function(req, res){
	let { serverId } = req.query; 

	vwx.media2url(serverId).then(qn_resp => {
		rps.send2000(res, qn_resp); 
	}).catch(err => {
		rps.send5007(res, req.query, err); 
	}); 
});

module.exports = router; 
