// index.js
const { httpGet } = require('../http.client')
    , qs = require('querystring')
    , qnx = require('../qnx')
    , uuid = require('uuid/v4')
    , R = require('../redis')
    , MUSIC_KEY = 'dailymusic'
    , KUGOU_URL = 'http://m.kugou.com/app/i/getSongInfo.php'
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
	let { album_img, bitRate, fileSize, url, cover, imgUrl } = musicDetail; 

	album_img = album_img || cover || imgUrl || ''; 

	if (album_img === '') album_img = '/images/暂无封面'; 
	else album_img = album_img.replace('{size}', '400'); 

	let duration = (fileSize / (bitRate / 8)) / 1000; 
	let name = uuid(); 

	// Fetch 
	console.log('FETCH', album_img); 
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
			duration: duration,
			kugou: musicDetail
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
		temp.duration = temp.duration || 10; 
		return temp; 
	});
}

function todayZero(ts){
	return parseInt(ts % 86400000 / 1000);
}

var count = 0; 
var musicQueue = []; 
// var zero = 0;
var zero = todayZero(Date.now()); 
// var MAX_TIME = 86400;
// var MAX_TIME = zero + 1200; 
var MAX_TIME = 86400; 

var enQueue = (hash, content, who) => {
	console.log('MAX_TIME', MAX_TIME); 
	console.log('zero', zero); 
	console.log('count', count); 

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
			musicer.content = content || '__未设置'; 
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
	ts = todayZero(ts); 

	let length = musicQueue.length; 
	let next = musicQueue.pop(); 

	if (!now) {
		// 尚无播放的 
		if (next){
			// 如果有 next 那么走next 
			console.log('MQ', 1)
			now = next; 
			return now; 
		} else {
			// 否则就 null 返回 
			console.log('MQ', 2);
			zero = todayZero(Date.now()); 
			return null; 
		}
	} else {
		// 有正在播放的 
		if (next){
			// 而且下一首是存在的 
			if (ts >= next.start_at){
				// 该切换了 
				now = next; 

				console.log('MQ', 3)
				return now;
			} else {
				// 额 不该切换 把下一首压回去 
				musicQueue.push(next); 

				console.log('MQ', 4)
				return now; 
			}
		} else {
			// 下一首并不存在 说明是最后一首
			if (ts >= now.start_at + now.duration){
				now = null; 

				zero = todayZero(Date.now()); 
				// 此处应该 reset 
				console.log('MQ', 5)
				return now; 
			} else {
				// 播着。。。
				console.log('MQ', 6)
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
