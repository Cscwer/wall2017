// danmaku.js
module.exports = function(io, socket){
	let { user } = socket;

	socket.on('join-danmaku', function(){

		socket.on('shot-send', function(d){
			console.log(`shot ${user.nickname}`, d); 

			// To All ; 
			io.to('danmaku-channel').emit('shot', d); 
		})


		// Join... 
		socket.join(['danmaku-channel'], (err) => {
			console.log(err, user.nickname, 'join danmaku channel'); 
		})
	});

	socket.on('leave-danmaku', function(){
		console.log('say good bye', user.nickname); 
		
		socket.removeAllListeners([
			'shot-send'
		]); 

		socket.leave('danmaku', (err, $2) => {
			console.log(user.nickname, 'leave danmaku channel'); 
		}); 
	})

	return ['leave-danmaku', 'join-danmaku']
}