// http.client.js
import axios from 'axios'; 
import logger from './logger';

let http = {}; 

http.send = method => function(path, query = {}, data = {}){
	let toSend = {}; 

	if (arguments.length === 2){
		if (method === 'get'){
			toSend.params = query; 
		} else {
			// 此时 query 将作为 body 
			toSend = query; 
		}
	} else if (arguments.length === 3){
		// 参数给全的情况
		toSend = data; 
		toSend.params = query; 
	}

	logger.req(method, path, toSend);

	return axios[method](path, toSend).then(httpRes => {
		logger.res(method, path, httpRes); 

		return httpRes.data; 
	}, err => {
		console.log(err); 
	})
}

http.get = http.send('get'); 
http.post = http.send('post'); 

var constFunc = a => a; 

var queryStringify = o => {
	return Object.keys(o).map(key => {
		// let val = encodeURIComponent(o[key]); 
		let val = o[key]; 
		return [ key, val ]
	}).map(temp => {
		let [key, val] = temp; 

		return `${key}=${val}`; 
	}).join('&')
}

// jsonp 部分
let JSONP_COUNTER = 0;
let CB_NAME = 'GW_JSONP';

function getFuncName(){
	return CB_NAME + JSONP_COUNTER ++;
}

http.jsonp = function(url, funcName){
	console.log('FULLURL', url); 

	logger.req('JSONP', url, {}); 

	return new Promise((res, rej) => {
		// 设置不重复的回调
		window[funcName] = httpRaw => {
			res(httpRaw); 
		}

		// DOM 操作
		var body = document.getElementsByTagName('body')[0];
		var script = document.createElement('script');

		script.setAttribute('src', url);
		body.appendChild(script);
	}).then(JSON.parse).then(httpResponse => {
		logger.res('JSONP', url, httpResponse); 
		return httpResponse; 
	}); 
}

http.mixer = function(url, query){
	return url + '&' + queryStringify(query); 
}

http.proxy = function(fullurl){
	let proxyer = 'https://bird.ioliu.cn/v2'; 
	let funcName = getFuncName(); 
	return {
		fullurl: proxyer + '?url=' + fullurl + '&callback=' + funcName, 
		funcName: funcName
	} 
}

http.bird = (kugouURL, queryInit) => (query = {}) => {
	// Set Default Value 
	query = queryInit(query) || {}; 

	let { fullurl, funcName } = http.proxy(
		http.mixer(kugouURL, query)
	); 

	// send jsonp request
	return http.jsonp(fullurl, funcName); 
}

http.musicSearch = http.bird(
	'http://mobilecdn.kugou.com/api/v3/search/song', 
	query => {
		query.page      =  query.page     ||  0; 
		query.pagesize  =  query.pagesize || 20; 
		query.format    =  'json'; 
		return query; 
	}
); 

http.musicDetail = http.bird(
	'http://m.kugou.com/app/i/getSongInfo.php', 
	query => {
		query.cmd = 'playInfo'; 
		return query; 
	}
); 

// http.musicDetail = function(query){
// 	let kugouURL =  
	
// 	let { fullurl, funcName } = http.proxy(
// 		this.mixer(kugouURL, query)
// 	); 
// }

export default http; 
