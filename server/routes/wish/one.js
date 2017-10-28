// one.js
const { wishModel } = require('../../utils/db')
    , R = require('../../utils/redis')
    , one = {}

function findInDB(_id){
	return wishModel.findOne({ _id: _id })
			.populate('she')
			.populate('he').then(obj => {
				obj && R.setObj(_id, obj); 

				return obj; 
			})
}

function removeFromDB(_id){
	return wishModel.remove({
		_id: _id
	}); 
}

one.set = function(_id, obj){
	return R.setObj(_id, obj); 
}

one.sync = function(_id){
	return findInDB(_id); 
}

one.find = function(_id){
	return R.getObj(_id).then(obj => {
		if (obj) {
			return obj; 
		} else {
			return findInDB(_id); 
		}
	}).catch(err => {
		console.log('[ ERROR ]', err); 
	})
}

one.remove = function(_id){
	R.delObj(_id).catch(err => {
		console.log('err', err)
	}); 

	return removeFromDB(_id); 
}

// wishModel.findOne().then(wish => {
// 	console.log(wish)

// })

module.exports = one
