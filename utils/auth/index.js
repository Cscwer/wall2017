// index.js
const jwt = require('jsonwebtoken')
    , SECRET = `This_Is_Secret_Key`
    , R = require('../redis')

let auth = {}; 

auth.en = function(data = {}){
	let token = jwt.sign({
		// 一个钟 
		exp: Math.floor(Date.now() / 1000) + 99000000, 
		data: data
	}, SECRET);

	// 缓存 
	// console.log(data); 
	R.set(token, JSON.stringify(data));

	return token; 
}

auth.de = function(token){
	let data;

	return R.get(token).then(val => {
		if (val){
			// 缓存命中 
			return JSON.parse(val); 
		} else {
			// 否则尝试解开 
			try {
				opt = jwt.verify(token, SECRET);

				// 重置缓存 
				R.set(token, JSON.stringify(opt.data));

				return opt.data; 
			} catch (err) {
				// 如果出错 证明该 Token 不合法 
				console.log(err)
				return Promise.reject(false); 
			}
		}
	})
}

module.exports = auth; 
