// page.js
const N = 10
    , { wishModel } = require('../../utils/db')
    , R = require('../../utils/redis')
    , WISH_LIST_NS = 'WISH-LIST'
    , EXP_TIME = 10


var flushTime = 0;
function cacheFlush(){
	// 五十页 
	flushTime ++ ;
	wishModel.find({
		status: 0
	}).populate('she').sort({
		created_at: -1
	}).limit(N * 50).then(list => {
		return R.initQueue(WISH_LIST_NS, list).then(ok => {
			console.log(`[ Wall Cache Update ] 第 ${flushTime} 次刷新, Count: ${ok}`); 
		}); 
	})	
}

// Start 
cacheFlush(); 
let timer = setInterval(cacheFlush, EXP_TIME * 1000);

// In Mongo 
function inMongo(p){
	return wishModel
		.find({
			status: 0
		})
		.populate('she')
		.sort({
			created_at: -1
		})
		.skip(p * N)
		.limit(N)
}

function inCache(p){
	console.log('[ Wall From Cache ] Page:', p); 
	return R.page(WISH_LIST_NS, p, N)
}

function find(p){
	// inMongo
	if (p > 50){
		return inMongo(p)
	} else {
		return inCache(p); 
	}
}

module.exports = {
	find: find,
	timer: timer
}
