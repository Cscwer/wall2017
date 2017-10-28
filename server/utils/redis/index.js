let Redis = require('ioredis'); 

var R = new Redis(); 

// R.hset('foo', {
// 	hello: 'world'
// }); 

// console.log(Redis.Command)

// Redis.Command.setArgumentTransformer('hmset', function (args) {
// 	console.log(args)
// 	return args;
// });




// let u = {
// 	"_id": "59cb7a292400a81eb8d8a467",
// 	"openid": "opdbdwdWXWMg9UY72Z4i_DTcblR0",
// 	"nickname": "eczn",
// 	"sex" : 0,
// 	"headimgurl": "http://wx.qlogo.cn/mmopen/vi_32/sBlxQJd2SyVeyroibMblibJyoINHpLnfPwGDib8mNzfMibAsrdxeSOyYqOtYjrglx04mJ2TeM3Pr4juMKjpHJJFcZA/0",
// 	"created_at": new Date("2017-09-27T10:15:05.611Z"),
// 	"ps": "这个懒虫没有设置签名 ~ ",
// 	"phone": "未设置",
// 	"bg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAE0lEQVQImWPcvXv3fwYgYGKAAgAxOAM0xpONdQAAAABJRU5ErkJggg==",
// 	"__v" : 0
// }


// R.hmset('eczn', u); 


// R.hgetall('eczn').then(suc => {
// 	console.log(suc)
// }); 

// R.set(keys, values, ‘EX’, 3 * 60)

// R.set('121244', 'VALVAL', 'EX', 10); 
// R.set('121244', '123', 'EX', 10); 

// var d = R.get('access_token').then(res => {
// 	console.log(res)
// }); 

// 命名空间
let JS_OBJ_NS = 'JSOBJ-'; 
let JS_QUEUE_NS = 'JSQUEUE-'

R.setObj = (key, obj) => {
	key = JS_OBJ_NS + key; 

	let obj_json = JSON.stringify(obj); 

	return R.set(key, obj_json); 
}

R.delObj = key => {
	key = JS_OBJ_NS + key; 

	return R.del(key)
}

R.getObj = key => {
	key = JS_OBJ_NS + key; 

	return R.get(key).then(obj_json => {
		return JSON.parse(obj_json); 
	}).catch(err => {
		console.log('[ ERROR ] R.getObj'); 
		console.log(err); 

		return null; 
	})
}

R.enQueue = (key, obj) => {
	key = JS_QUEUE_NS + key; 

	let obj_json = JSON.stringify(obj); 

	return R.lpush(key, obj_json).catch(err => {
		console.log('[ ERROR ] R.enQueue'); 
		console.log(err); 

		return null; 
	}); 
}

R.initQueue = (key, list) => {
	key = JS_QUEUE_NS + key; 

	return R.del(key).then(done => {
		let temp = list.map(JSON.stringify); 
		
		return R.lpush(key, temp); 
	})
}

R.deQueue = key => {
	key = JS_QUEUE_NS + key; 

	return R.rpop(key).then(JSON.parse).catch(err => {
		console.log('[ ERROR ] R.deQueue'); 
		console.log(err); 

		return null; 
	})
}

R.cancelDeQueue = (key, obj) => {
	key = JS_QUEUE_NS + key; 

	let obj_json = JSON.stringify(obj); 

	return R.rpush(key, obj_json).catch(err => {
		console.log('[ ERROR ] R.rpush'); 
		console.log(err); 

		return null; 
	}); 
}

R.lenQueue = key => {
	key = JS_QUEUE_NS + key; 

	return R.llen(key); 
}

R.page = (key, p, N) => {
	key = JS_QUEUE_NS + key;  

	return R.lrange(
		key,
		-((p + 1) * N),
		-(1 + p * N)
	).then(arr => arr.map(JSON.parse)); 
}

// R.rangeQueue = key => {
// 	key = JS_QUEUE_NS + key; 

// 	return R.
// }
R.fullQueue = key => {
    key = JS_QUEUE_NS + key;  
    return R.lrange(key, 0, -1).then(arr => arr.map(JSON.parse)); 
}

R.delQueue = key => {
	key = JS_QUEUE_NS + key;  

	return R.del(key); 
}

// R.topQueue = key => {
// 	key = JS_OBJ_NS + key; 

// 	return R.rrange(key, -2, 0).then(e => {
// 		console.log(e); 
// 		return JSON.parse(e)
// 	}).catch(err => {
// 		console.log('[ ERROR ] R.topQueue'); 
// 		console.log(err); 

// 		return null; 
// 	}); 
// }

module.exports = R; 
