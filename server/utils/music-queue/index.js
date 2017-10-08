// index.js
const { httpGet } = require('../http.client')
    , qs = require('querystring')
    , qnx = require('../qnx')
    , uuid = require('uuid/v4')
    , R = require('../redis')
    , MUSIC_KEY = 'dailymusic'
    , KUGOU_URL = 'http://m.kugou.com/app/i/getSongInfo.php'
    , MAX_TIME = 600
    , pwd = "asd123"


var getMusicDetail = hash => {
	let param = {
		hash: hash, 
		cmd: 'playInfo', 
		format: 'json'
	}

	let full_url = KUGOU_URL + '?' + qs.stringify(param); 

	return httpGet(full_url); 
}

var musicFetch = musicDetail => {
	let { album_img, bitRate, fileSize, url } = musicDetail; 

	if (album_img === '') album_img = '/images/暂无封面'; 

	let duration = (fileSize / (bitRate / 8)) / 1000; 
	let name = uuid(); 

	// Fetch 
	let fetch_album = qnx.fetch(album_img, `music-album/${name}.jpg`); 
	let fetch_mp3 = qnx.fetch(url, `music-mp3/${name}.mp3`); 

	return Promise.all([
		fetch_album, 
		fetch_mp3
	]).then(allDone => {
		let [albumResp, mp3Resp] = allDone; 

		console.log('Cover', albumResp); 

		return {
			cover: albumResp.url, 
			mp3: mp3Resp.url, 
			duration: duration
			// n 
			// start_at 
		}
	});
}

var getMusicer = hash => {
	let key = 'MUSIC_HASH_' + hash; 

	var temp;
	return R.getObj(key).then(cache => {
		if (cache){
			// 命中缓存 
			temp = cache; 
			return temp; 
		} else {
			return getMusicDetail(hash).then(musicFetch).then(musicer => {
				temp = musicer; 
				return R.setObj(key, temp); 
			}); 
		}
	}).then(suc => {
		return temp; 
	});
}

var count = 0; 
var musicQueue = []; 
var zero = 0; 
var enQueue = (hash, content, who) => {
	if (zero > MAX_TIME){
		// Max 
		return Promise.resolve(null); 
	} else {
		return getMusicer(hash).then(musicer => {
			// Set start_at
			musicer.start_at = zero; 
			zero += musicer.duration; 

			// Set n 
			count     = count + 1; 
			musicer.n = count;

			// Set base info  
			musicer.content = content; 
			musicer.who     = who; 

			// enQueue
			musicQueue.unshift(musicer); 

			// evalQueue();
			return musicer; 
		}); 
	}
}

var now = null;
var getNowPlaying = ts => {
	let length = musicQueue.length; 
	let next = musicQueue.pop(); 

	if (!now) {
		if (next){
			now = next; 
			return now; 
		} else {
			return null; 
		}
	} else {
		if (next){
			if (ts >= next.start_at){
				now = next; 
				return now;
			} else {
				musicQueue.push(next); 
				return now; 
			}
		} else {
			if (ts >= now.start_at + now.duration){
				now = null; 

				// 此处应该 reset 

				return now; 
			} else {
				return now;
			}
		}
	}
}

// var evalQueue = () => {
// }

var reset = input_pwd => {
	if (input_pwd === pwd){
		count = 0; 
		now = null; 
		zero = 0; 
		musicQueue = []; 
		return true; 
	} else {
		return false; 
	}
}

// 
// musicIn(
// 	'6d93f084270ac0540cb84e43b00436dd',
// 	'fuck'
// ); 

module.exports = {
	enQueue: enQueue, 
	getNowPlaying: getNowPlaying, 
	reset: reset
}
