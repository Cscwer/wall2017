var WXBizDataCrypt = require('./WXBizDataCrypt')
var config = require('../../../config'); 

module.exports = (sessionKey, encryptedData, iv) => {
	var appId = config.appid; 
	var pc = new WXBizDataCrypt(appId, sessionKey)
	var data = pc.decryptData(encryptedData , iv)

	return data; 
}
