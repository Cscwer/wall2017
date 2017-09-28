// http.client.js
import axios from 'axios'; 
import logger from './logger';

let http = {}; 

http.get = (path, data = {}) => {

	logger.req(path, data); 

	return axios.get(path, {
		params: data
	}).then(httpRes => {
		logger.res(path, httpRes); 

		return httpRes.data; 
	}, err => {
		console.log(err); 
	})
}

export default http; 
