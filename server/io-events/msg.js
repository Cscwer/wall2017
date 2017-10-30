// msg.js
const R = require('../utils/redis')

module.exports = function(io, socket){
	socket.on('sendMsg', function(data){
		let { her_id, content } = data; 
		let { user } = socket;
		let herSocket = io.socketTable[her_id]; 
		
		let msg = {
			type: 'chat', 
			from: user,
			content: content,
			create_at: + new Date()
		}

		console.log(
			`${user.nickname} say ${content} to ${her_id}`
		); 

		if (herSocket) {
			// 在线 
			let her = herSocket.user; 
			console.log(`${her.nickname} is online, just send it`);
			herSocket.emit('revMsg', msg); 
		} else {
			// 不在线 需要缓存聊天信息 
			console.log(`${her_id} is offline, cache it`);
			R.enQueue('UNREAD-MSG-' + her_id, msg); 
		}
	});

	return ['sendMsg']
}