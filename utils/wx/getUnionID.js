// getUnionID.js 
const request = require('request')
    , WX_API_URL = 'https://api.weixin.qq.com/sns/jscode2session'
    , qs = require('querystring')
    , { appid, secret } = require('../../config')

function getUnionID(code){
	let query = qs.stringify({
		js_code: code, 
		appid: appid, 
		secret: secret, 
		grant_type: 'authorization_code'
	}); 

	return new Promise((prores, prorej) => {
		request.get(WX_API_URL + '?' + query, function(err, res, body){
			body = JSON.parse(body); 
			if (body.openid) prores(body); 
			else prorej(err || body)
		}); 
	})
}

module.exports = getUnionID; 
