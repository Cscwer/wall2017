// system.js
const express = require('express')
    , router = express.Router()
    , rps = require('../utils/rps')
    , os = require('os')

router.get('/usage', function(req, res){
	rps.send2000(res, {
		cpu: process.cpuUsage(), 
		mem: {
			total: os.totalmem() / 1024 / 1024 , 
			free: os.freemem() / 1024 / 1024
		}
	}); 
}); 

router.get('/clear-cookie', function(req, res){
	res.cookie('user-token', 'no~~', {
		expires: new Date()
	});

	res.json({
		msg: '好了 清空了'
	}); 
})

module.exports = router; 
