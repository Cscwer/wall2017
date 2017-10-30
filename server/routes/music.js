// music.js
const express = require('express')
    , router = express.Router()
    , rps = require('../utils/rps')
    , M = require('../utils/music-queue')
    , IO = require('../io')

router.get('/', function(req, res){
	// let ts = parseInt(req.query.ts); 
	
	let now = M.getNowPlaying(new Date()); 

	if (now) {
		rps.send2000(res, now); 
	} else {
		rps.send2003(res, now); 
	}
}); 

router.post('/', function(req, res){
	let who = req.user; 
	let { hash, content } = req.body; 

	M.enQueue(hash, content, who).then(musicer => {
		if (musicer){
			rps.send2000(res, musicer); 

			if (musicer.n === 1){
				IO.io.to('danmaku-channel').emit('musicReload', {
					type: 'music-reload',
					data: musicer,
					msg: '刷新'
				}); 
			}
		} else {
			rps.send4102(res, null); 
		}
	}); 
});

router.get('/reset', function(req, res){
	let { pwd } = req.query;

	let result = music.reset(pwd); 

	rps.send2000(res, result); 
}); 


// ?format=json&keyword=初音&page=1&pagesize=10
// router.get('/search', function(req, res){

// }); 

module.exports = router; 
