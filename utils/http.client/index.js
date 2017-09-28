// index.js
const rp = require('request-promise');

function httpGet(url, isJSON = true){
	return rp(url).then(res => {
		try {
			if (isJSON) res = JSON.parse(res); 
		} catch (e) {}

		return res; 
	})
}

module.exports = {
	httpGet
}
