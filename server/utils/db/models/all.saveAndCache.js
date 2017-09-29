// all.saveAndCache.js
const R = require('../../redis')

/* 
 *  @name       Model.saveAndCache
 *  @param      rwa_data
 *  @describe   在表中插入一个元素并为其创建 redis 缓存 
 *  @return     Promise<document>
 */
function saveAndCache(raw_data){
	let Model = this;
	
	let data = new Model(raw_data); 

	let _id = data._id.toString(); 

	return data.save(doc => {
		R.setObj(_id, doc); 

		return doc; 
	}).catch(err => {
		console.log('[ ERROR ] all.saveAndCache.js'); 
		console.log(err); 
		
		return Promise.reject(err); 
	}); 
}

module.exports = saveAndCache; 
