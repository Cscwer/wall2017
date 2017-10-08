const { httpGet } = require('../http.client')
    , qs = require('querystring')
    , config = require('../../config')
    , R = require('../redis')
    , wait = require('../wait')
    , sdk = require('./sdk')
    , qnx = require('../qnx')
    , uuid = require('uuid')
    , IMAGE_KEY_NS = 'girl-wall-image/'; 

/**
*  获取 access_token
*  @param  void
*  @return Promise<string>
*/
function getAccessToken(){
	let qsStr = qs.stringify({
		grant_type: 'client_credential',
		appid: config.AppID, 
		secret: config.AppSecret
	}); 
	var url = 'https://api.weixin.qq.com/cgi-bin/token?' + qsStr;

	return httpGet(url).then(bodyObj => {
		// console.log(bodyObj)
		if (bodyObj.access_token){
			return bodyObj.access_token;  
		} else {
			console.log(bodyObj)
			return Promise.reject('body has no access_token'); 
		}
	}).catch(err => {
		console.log(err); 
		return wait(1000).then(() => {
			return getAccessToken(); 
		})
	});
}

/**
*  用 access_token 换取 jsapi_ticket
*  @param  code:string
*  @return Promise<object>
*/
function getTicket(access_token){
    var url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`; 
    return httpGet(url).then(bodyObj => {
    	// console.log(bodyObj); 

    	if (bodyObj.ticket){
    		return bodyObj.ticket; 
    	} else {
    		return Promise.reject('body has no ticket'); 
    	}
    }).catch(err => {
    	console.log(err); 
    	return wait(1000).then(() => {
    		return getTicket(); 
    	})
    })
}

/**
*  用 code 换取用户信息
*  @param  code:string
*  @return Promise<object>
*/
function code2user(code){
	let qsStr =  qs.stringify({
		appid: config.AppID,
		secret: config.AppSecret,
		code: code,
		grant_type: 'authorization_code'
	}); 
	let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?'+qsStr; 

	return httpGet(url).then(o => {
		if (!o.access_token) return Promise.reject('No Access Token'); 

		var qsStr = qs.stringify({
			access_token: o.access_token, 
			openid: o.openid, 
			lang: 'zh_CN'
		});

		let url = 'https://api.weixin.qq.com/sns/userinfo?' + qsStr;

		return httpGet(url);
	}).catch(err => {
		console.log(err); 
		return wait(1000).code2user(code); 
	})
}


function media2url(media_id){
	return R.get('access_token').then(access_token => {
		let url = 'https://api.weixin.qq.com/cgi-bin/media/get'; 
		// "http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=" + access_token + "&media_id=" + media_id;
		let img_url = url + '?' + qs.stringify({
			access_token: access_token, 
			media_id: media_id
		}); 

		let key = IMAGE_KEY_NS + uuid(); 

		return qnx.fetch(img_url, key); 
	}); 
}

// Loop 
(function loopGet(){
	// let pre_access_token = R.get('access_token'); 
	getAccessToken().then(new_access_token => {
		R.set('access_token', new_access_token, 'EX', 7000); 
		console.log('[ access_token Update ]', new_access_token);

		return getTicket(new_access_token); 
	}).then(ticket => {
		R.set('jsapi_ticket', ticket, 'EX', 7000); 

		console.log('[ jsapi_ticket Update ]', ticket);

		setTimeout(loopGet, 6000000); 
	})
})(); 

module.exports = {
	code2user, 
	getAccessToken, 
	sdk, 
	media2url
}
