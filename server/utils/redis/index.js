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

module.exports = R; 
