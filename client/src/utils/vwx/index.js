// vwx.js
import _ from '@/utils/vwx/wx.promise'; 
import http from '@/utils/http.client'; 

let jsApiList = [
	'chooseImage', 
	'previewImage', 
	'uploadImage', 
	'downloadImage'
]
let DEBUG_MODE = false; 

let vwx = {}; 
var URL = null; 

function get_url(){
	let { href, hash } = location; 
	let url = href.replace(hash, ''); 

	return url; 
}

function check(){
	let nowURL = get_url(); 

	if (nowURL === URL){
		return true; 
	} else {
		return false; 
	}
}

vwx.config = () => {
	let config_url = get_url(); 
	return http.get('/api/wx/config', {
		url: encodeURIComponent( config_url )
	}).then(res => {
		let info = res.data; 
		info.debug = DEBUG_MODE; 
		info.jsApiList = jsApiList; 

		wx.config(info); 

		return new Promise((res, rej) => {
			wx.ready(function(){
				URL = config_url; 
				res(config_url); 
			}); 
			wx.error(rej); 
		})
	})
}

vwx.create = function(name, fn){
	this[name] = () => {
		let arr = Array.prototype.slice.call(arguments); 

		if (check()){
			console.log(`[CONFIG: OK] Calling vwx.${name}`); 
			return fn.apply(vwx, arr);
		} else {
			console.log(`[CONFIG: FAIL] ReConfig ... `); 

			return vwx.config().then(ok => {
				console.log(`[CONFIG: OK] Calling vwx.${name}`); 

				return fn.apply(vwx, arr); 
			})
		}
	}
}

vwx.create('chooseImage', function(){
	return _.chooseImage({
	    count: 1,
	    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	});
}); 

vwx.create('getAnImg', function(){
	return vwx.chooseImage().then(res => {
		let localId = res.localIds[0]; 
		
		return _.uploadImage({
			localId: localId, 
			isShowProgressTips: 1
		})
	}).then(res => {
		let serverId = res.serverId; 

		return http.get('/api/wx/img', {
			serverId: serverId
		});
	});
}); 

export default vwx; 
