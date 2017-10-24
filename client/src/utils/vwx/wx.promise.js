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

export default [
	'chooseImage', 'uploadImage', 'downloadImage', 'previewImage'
].reduce((acc, cur) => {
	acc[cur] = wxPromisify(wx[cur]); 

	return acc; 
}, {
	wxPromisify: wxPromisify
}); 
