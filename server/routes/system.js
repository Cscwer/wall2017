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

module.exports = router; 
