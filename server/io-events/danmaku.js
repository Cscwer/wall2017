// danmaku.js
module.exports = function(io, socket){
	socket.on('join-danmaku', function(){
		let { user } = socket;
		
		console.log('joining')

		socket.on('shot', function(d){
			console.log('shot', d); 
			io.to('danmaku').emit('shot', d); 
		})

		socket.join('danmaku', () => {
			console.log(user.nickname, 'join danmaku channel'); 
		})

		socket.on('leave-danmaku', function(){
			socket.leave('danmaku'); 
		})
	});
}