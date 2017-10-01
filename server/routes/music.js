// music.js
const express = require('express')
    , router = express.Router()
    , rps = require('../utils/rps')
    , { httpGet } = require('../utils/http.client')
    , qs = require('querystring')
    , qnx = require('../utils/qnx')
    , uuid = require('uuid/v4')
    , R = require('../utils/redis')
    , MUSIC_KEY = 'dailymusic'

let nowPlaying = null; 
router.get('/', function(req, res){
	console.log('\n\n'); 

	let ts = parseInt(req.query.ts); 
	// let ts = +new Date(); 
	console.log('ts', ts); 
	if (typeof ts !== 'number') return rps.send4000(res, req.query, 'ts 错误');

	let today_now = ts % 86400000; 

	R.deQueue(MUSIC_KEY).then(nextPlaying => {
		if (!nowPlaying) nowPlaying = nextPlaying; 

		console.log('nextPlaying', nextPlaying); 

		if (nextPlaying){
			if (today_now >= (nextPlaying.start_at + nextPlaying.duration)) {
				nowPlaying = nextPlaying; 
			} else {
				R.cancelDeQueue(MUSIC_KEY, nowPlaying); 
			}

			rps.send2000(res, nowPlaying)
		} else {
			rps.send2003(res, {}); 
		}
	}); 
}); 

// 抢歌 
let zero = 0; 
let MAX_TIME = 600; 
router.post('/', function(req, res){
	if (zero >= MAX_TIME) {
		rps.send4102(res, {}); 
		return; 
	}

	let { hash } = req.body; 
	let url = 'http://m.kugou.com/app/i/getSongInfo.php'; 
	let param = {
		hash: hash, 
		cmd: 'playInfo', 
		format: 'json'
	}

	httpGet(url + '?' + qs.stringify(param)).then(httpRes => {
		let { album_img, bitRate, fileSize, url } = httpRes; 
		let musicer;
		// duraion: second
		let duration = (fileSize / (bitRate / 8)) / 1000; 

		let name = uuid(); 

		let fetch_album = qnx.fetch(album_img, `music-album/${name}.jpg`); 
		let fetch_mp3 = qnx.fetch(url, `music-mp3/${name}.mp3`); 

		Promise.all([
			fetch_album, 
			fetch_mp3
		]).then(allDone => {
			let [albumResp, mp3Resp] = allDone; 

			return R.lenQueue(MUSIC_KEY).then(n => {
				musicer = {
					cover: albumResp.url, 
					mp3: mp3Resp.url, 
					duration: duration,
					n: n,
					start_at: zero
				}

				if (zero >= MAX_TIME) {
					// 过载 
					console.log('满了'); 
					rps.send4102(res, {}); 
				} else {
					return R.enQueue(MUSIC_KEY, musicer).then(done => {
						zero += duration; 
						console.log('成功'); 
						rps.send2000(res, musicer); 
					}); 
				}
			}); 
		}).catch(err => {
			console.log('[ ERROR ] post /api/music');

			rps.send5099(res, {}, err); 
		});
	}, err => {
		console.log(err); 
	});
});

let SEARCH_URL = 'http://mobilecdn.kugou.com/api/v3/search/song'; 

// ?format=json&keyword=初音&page=1&pagesize=10
// router.get('/search', function(req, res){

// }); 

module.exports = router; 
