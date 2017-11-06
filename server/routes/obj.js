// obj.js
const express = require('express')
    , router = express.Router()
    , rps = require('../utils/rps')

let banners = [
	'https://io.chenpt.cc/banner/HAPPY-GIRLS-DAY.png',
	'https://io.chenpt.cc/banner/music.png',
	'https://io.chenpt.cc/banner/love.png',
	'https://io.chenpt.cc/banner/reverse.png'
]; 

router.get('/banners', function(req, res){
	rps.send2000(res, banners); 
})

module.exports = router; 
