// config.js
const os = require('os')
    , os_type = os.type().toLowerCase(); 

let r_url; 

if (os_type.startsWith('windows')){
	r_url = 'http://gw.chenpt.cc/api/entry/code'; 
} else {
	r_url = 'https://gw.chenpt.cc/api/entry/code'; 
}


module.exports = {
	redirect_param: {
		appid: 'wxa70c4891aeab4ae1', 
		// redirect_uri: 'https://gw.chenpt.cc', 
		redirect_uri: r_url, 
		response_type: 'code', 
		scope: 'snsapi_userinfo',
		state: '0' 
	},
	// AppID: 'wxca79087c2e5cf375', 
	// AppSecret: '0dfb3847153ade322b36d42323e91dba'
	AppID: 'wxa70c4891aeab4ae1',
	AppSecret: 'ffff67117338e06faf403581ebc32830'
}