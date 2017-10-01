let qnx = require('./index'); 

let pic = 'http://imge.kugou.com/stdmusic/400/20170523/20170523124422901835.jpg'; 

qnx.fetch(pic, 'asd/啦啦啦.jpg').then(res => {
	console.log(res); 
})
