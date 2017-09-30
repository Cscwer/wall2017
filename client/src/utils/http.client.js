// http.client.js
import axios from 'axios'; 
import logger from './logger';

let http = {}; 

http.send = method => function(path, query = {}, data = {}){
	let toSend = {}; 

	if (arguments.length === 2){
		if (method === 'get'){
			toSend.params = query; 
		} else {
			// 此时 query 将作为 body 
			toSend = query; 
		}
	} else if (arguments.length === 3){
		// 参数给全的情况
		toSend = data; 
		toSend.params = query; 
	}

	logger.req(method, path, toSend);

	return axios[method](path, toSend).then(httpRes => {
		logger.res(method, path, httpRes); 

		return httpRes.data; 
	}, err => {
		console.log(err); 
	})
}

http.get = http.send('get'); 
http.post = http.send('post'); 

export default http; 
