// test.js
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

R.hmset('hash-set', {
	a: [1, 2, 3]
}); 

R.hgetall('hash-set').then(suc => {
	console.log(suc)
}); 

