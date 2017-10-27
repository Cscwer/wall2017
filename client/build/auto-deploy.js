// auto-deploy.js
const Client = require('ssh2-sftp-client')
    , sftp = new Client()
    , fs = require('then-fs')
    , path = require('path')
    , globby = require('globby')
    , qnx = require('../../server/utils/qnx')
    , logger = require('./logger')

let DIST_BASE = path.join(__dirname, '../dist').replace(/\\/g, '/'); 
let DIST_BASE_Glob = path.join(__dirname, '../dist/**/*.*'); 
let REMOTE_BASE = '/home/wwwroot/gw.chenpt.cc/';

let allFiles = globby(DIST_BASE_Glob).then(paths => {
	return paths.map(path => {
		return path.replace(DIST_BASE, '').slice(1)
	})
}).then(upload)

let notStartWishDot = list => {
	return list.filter(item => {
		let { name } = item; 

		return !name.startsWith('.'); 
	});
}

function upload(files){
	// console.log(files); 

	let connection = sftp.connect({
		host: '123.207.77.72',
		port: '22',
		username: 'root',
		password: 'worinidaye'
	})


	let index = files[0]; 
	let LOCAL_index = DIST_BASE + '/' + index ; 
	let REMOTE_index = REMOTE_BASE + index; 
	

	let index_upload = connection.then(ok => {
		return sftp.put(LOCAL_index, REMOTE_index); 
	}).then(ok => {
		logger('Success'.data, 'index.html'.info);
		sftp.end(); 
	}).catch(err => {
		logger('ERR', err); 
	})


	let remain = files.slice(1); 

	let other_upload = remain.map(file => {
		let local = DIST_BASE + '/' + file; 

		return qnx.upload(local, file).then(res => {
			logger('Success'.data, file.info); 
		}).catch(msg => {
			if (msg.error === 'file exists'){
				// console.log('[ Ignore  ]', file); 
				logger('Ignore', file); 
			} else {
				logger('ERR', msg.error); 
			}
		})
	})

	Promise.all(
		other_upload.concat(index_upload)
	).then(allDone => {
		logger('AllDone'.data, 'https://gw.chenpt.cc'.warn); 
	})
}