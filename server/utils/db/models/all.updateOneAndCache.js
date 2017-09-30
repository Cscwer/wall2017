// all.updateAndCache.js
const R = require('../../redis')

/* 
 *  @name       Model.updateOneAndCache
 *  @param      conditions, update, opt
 *  @describe   在表中更新一个元素并重新在 redis 中缓存它
 *  @return     Promise<document>
 */
function updateOneAndCache(conditions, update, opt = {}){
	opt.new    = true; 
	// opt.upsert = true; 

	return this.findOneAndUpdate(conditions, update, opt).then(doc => {
		if (!doc) return null; 

		let key = doc._id.toString(); 
		R.setObj(key, doc); 

		return doc; 
	}).catch(err => {
		console.log('[ ERROR ] all.updateAndCache.js'); 
		console.log(err); 

		return Promise.reject(err); 
	}); 
}

module.exports = updateOneAndCache; 
