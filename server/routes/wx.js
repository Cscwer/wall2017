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


	vwx.media2url(serverId).then(bodyObj => {
		console.log('the body obj', bodyObj); 
		rps.send2000(res, bodyObj); 
	}); 
});

module.exports = router; 
