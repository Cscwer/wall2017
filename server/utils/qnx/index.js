// index.js
const qiniu = require('qiniu')
    , accessKey = '_Q0DqU92Up4NqUw5AEfsqRPRg7gHq_adR2uU5ohx'
    , secretKey = 'P6tXIslF_MLiR0vEoj_6ezMMy4kB6xv57L5qp3me'
    , mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    , config = new qiniu.conf.Config()
    , wait = require('../wait')
    , bucketManager = new qiniu.rs.BucketManager(mac, config)
    , QINIU_DOMAIN = 'http://source.ijarvis.cn'
    , opt = {
		scope: 'h5game',
		bucket: 'h5game', 
		expires: 1200, 
	}


// Set Zone 
config.zone = qiniu.zone.Zone_z2; 

function key2url(key){
	return bucketManager.publicDownloadUrl(QINIU_DOMAIN, key); 
} 

function qiniuToken(){
	let putPolicy = new qiniu.rs.PutPolicy(opt);
	let uploadToken = putPolicy.uploadToken(mac);

	return uploadToken; 
}


function upload(localFile, key){
	let token = qiniuToken(); 
	let putExtra = new qiniu.form_up.PutExtra();
	let formUploader = new qiniu.form_up.FormUploader(config);

	return new Promise((res, rej) => {
		formUploader.putFile(
			token, key,
			localFile, putExtra,
			(respErr, respBody, respInfo) => {
				if (respErr) {
					rej(respErr); 
					return ; 
				}

				if (respInfo.statusCode == 200) {
					respBody.img = key2url(respBody.key); 
					res(respBody); 
				} else {
					rej(respBody); 
				}
			}
		);
	})
}

function fetch(target_url, key){
	return new Promise((res, rej) => {
		bucketManager.fetch(
			target_url,
			opt.bucket,
			key,
			function(err, respBody, respInfo) {
				if (err) {
					console.log('[ ERROR ] qnx', err);
					rej(err); 
				} else {
					console.log('[ FETCH ]', respInfo.statusCode);

					if (respInfo.statusCode === 200) {
						respBody.url = key2url(respBody.key);
					}

					res(respBody); 
				}
			});
	})
}

module.exports = {
	qiniuToken: qiniuToken, 
	upload: upload, 
	fetch: fetch
}
