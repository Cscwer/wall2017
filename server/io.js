// io.js
const auth = require('./utils/auth')
    , R = require('./utils/redis')
    , danmaku = require('./io-events/danmaku')
    , msg = require('./io-events/msg')
    , IO = {}
    , socketTable = {}

module.exports = IO; 

let __users = [
	{
		_id: '123123', 
		nickname: 'eczn'
	}, 
	{
		_id: '4545', 
		nickname: '娃娃'
	},
	{
		_id: '6166', 
		nickname: '阿萨德'
	},
	{
		_id: '74357', 
		nickname: '哈哈哈'
	},
	{
		_id: 'zxvz', 
		nickname: '环境'
	}
]

let i = 0; 
function de(){
	i = i + 1; 
	i = i % __users.length; 
	return Promise.resolve(__users[i]); 
}


IO.init = function(io){
	io.socketTable = socketTable; 
	IO.io = io; 

	io.use((socket, next) => {
		let user_token = socket.handshake.query.user_token;
		

		auth.de(user_token).then(user => {
			socket.user = user; 

			next(); 
		});
	});

	// let io_msg = io.of('msg'); 
	io.on('connection', function(socket){
		let { user } = socket;
		socketTable[user._id] = socket; 

		console.log(user.nickname, 'connected'); 

		R.fullQueue('UNREAD-MSG-' + user._id).then(unreads => {
			socket.emit('login-success', {
				user,
				unreads
			}); 

			// 还要删掉
			R.delQueue('UNREAD-MSG-' + user._id);
		}); 


		// io-event
		msg(io, socket); 
		danmaku(io, socket); 


		socket.on('disconnect', reason => {
			if (!user) return; 

			console.log(user.nickname, 'exit'); 
			socketTable[user._id] = null; 
		});
	});
}
