// all.findInCache.js
const R = require('../../redis')

/**
*  @name        Model.findInCache
*  @param       _id
*  @describe    在表中根据 _id 来查找并返回 而且顺便做一下 redis 缓存
*  @return      Promise<document>
*/
function findInCache(_id) {
	return R.getObj(_id).then(doc => {
		if (doc){
			// 命中缓存
			return doc; 
		} else {
			// 未命中缓存
			return this.findOne({ _id: _id }).then(doc => {
				if (!doc) return null; 

				let key = doc._id.toString();

				// 重新缓存 
				R.setObj(key, doc); 

				return doc; 
			}); 
		}
	}).catch(err => {
		console.log('[ ERROR ] all.findInCache.js'); 
		console.log(err); 

		return Promise.reject(err); 
	})
}

module.exports = findInCache; 
