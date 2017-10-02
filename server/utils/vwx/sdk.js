// base.js
const config = require('../../config')
    , sha1 = require('sha1')
    , { httpGet } = require('../http.client')
    , qs = require('querystring')
    , R = require('../redis')
    , uuid = require('uuid/v4')

function getNoncestr(){
	return Math.random().toString(36).substr(2, 15);    
}

function wxConfig(url){
	let appId = config.AppID; 
	let timestamp = + new Date(); 
	let nonceStr = getNoncestr(); 

	return getSign(url, nonceStr, timestamp).then(signature => {
		return {
			appId, 
			timestamp, 
			nonceStr, 
			signature
		}
	}); 
}

function getSign(url, ns, ts){
	return R.get('jsapi_ticket').then(jsapi_ticket => {
		console.log('jsapi', jsapi_ticket); 

		var args = {
			jsapi_ticket: jsapi_ticket,
			nonceStr: ns,
			timestamp: ts,
			url: url
		}

		// 字典序排序键名
		var keys = Object.keys(args);
		keys = keys.sort(); 
		var newArgs = {};
		keys.forEach(function (key) {
			newArgs[key.toLowerCase()] = args[key];
		});

		var string = '';
		for (var k in newArgs) {
			string += '&' + k + '=' + newArgs[k];
		}

		string = string.substr(1);

		return sha1(string); 
	})
}

var sdk = {
	wxConfig
}; 

module.exports = sdk;
