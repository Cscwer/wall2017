// config.js
const os = require('os')
    , os_type = os.type().toLowerCase(); 

let r_url, kefu_id; 

if (os_type.startsWith('windows')){
	// 本地 windows
	r_url = 'http://gw.chenpt.cc/api/entry/code'; 
	kefu_id = "5a1136f89cd95e19cc260663"
} else {
	// 线上 linux 
	r_url = 'https://gw.chenpt.cc/api/entry/code'; 
	kefu_id = "5a0f110b1a7019341f7eaf7d"; 
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
	AppSecret: 'ffff67117338e06faf403581ebc32830',
	kefu: {
        // "_id" : "59ce826c4fece5203cd318c7",
        "_id": kefu_id, 
        "openid" : "4444",
        "nickname" : "客服小哥",
        "sex" : 2,
        "headimgurl" : "https://io.chenpt.cc/kefu/nw.png",
        "created_at" : "2017-09-29T17:27:08.773Z",
        "phone" : "未设置",
        "__v" : 0
	}
}