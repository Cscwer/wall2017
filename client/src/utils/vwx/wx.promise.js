function wxPromisify(fn) {
	return function (obj = {}) {
		return new Promise((resolve, reject) => {
			obj.success = function(c){
				resolve(c); 
			}
			obj.fail = function(err){
				reject(err);
			}
			fn(obj);
		});
	}
}

// Promise.prototype.finally = function (callback) {
// 	let P = this.constructor;
// 	return this.then(
// 		value => P.resolve(callback()).then(() => value),
// 		reason => P.resolve(callback()).then(() => { throw reason })
// 	);
// };

export default [
	'chooseImage', 'uploadImage', 'downloadImage'
].reduce((acc, cur) => {
	acc[cur] = wxPromisify(wx[cur]); 

	return acc; 
}, {
	wxPromisify: wxPromisify
}); 
