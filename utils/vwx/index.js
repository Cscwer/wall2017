const { httpGet } = require('../http.client')
    , { getSign } = require('./base')
    , qs = require('querystring')
    , config = require('../../config')
    , R = require('../redis')
    , wait = require('../wait')

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
		console.log(bodyObj)
		if (bodyObj.access_token){
			return bodyObj.access_token;  
		} else {

			Promise.reject('body has no access_token'); 
		}
	}).catch(err => {
		console.log(err); 
		return wait(1000).getAccessToken(); 
	});
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

// Loop 
(function loopGet(){
	// let pre_access_token = R.get('access_token'); 
	getAccessToken().then(new_access_token => {
		R.set('access_token', new_access_token, 'EX', 7000); 
		console.log('[ access_token Update ]', new_access_token);
		// 6000 秒后看看
		setTimeout(loopGet, 6000000); 
	})
})(); 

module.exports = {
	code2user, 
	getAccessToken
}
