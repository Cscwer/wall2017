// ta.js

/**
*  @name taModel.pingpong
*  @param  from
*  @return Promise
*/
function pingpong(from) {
	return this.findOne({
		from: from
	}).then(userFrom_record => {
		if (!userFrom_record) return null; 

		let { to } = userFrom_record; 

		return this.findOne({
			from: to
		}); 
	}).then(userTo_record => {
		if (!userTo_record) return null; 

		let { to } = userTo_record;

		if (to.toString() === from.toString()){
			// 说明互相暗恋 
			return this.findOne({
				from: from
			}).populate(['from', 'to'])
		} else {
			// 匹配失败 
			return false; 
		}
	}).catch(err => {
		// 出现错误 匹配失败
		console.log('[ ERROR ] ta.pingpong.js'); 
		console.log(err); 
		return false; 
	})
}

module.exports = pingpong; 
