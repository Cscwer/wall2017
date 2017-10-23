// ws.client.js
import cookie from '../cookie'; 

const USER_TOKEN = cookie.get('user-token')
    , socket = io('http://192.168.199.242:6677/?user_token=' + USER_TOKEN)
    , ws = {
		socket: socket, 
		user: null
	}

ws.ready = new Promise((res, rej) => {
	socket.on('login-success', function(info){
		let { user, unreads } = info; 
		console.log(info); 
		ws.user = user;

		res(info);		
	});
})



socket.on('revMsg', function(msg){
	console.log('revMsg'); 
	console.log(msg); 
});


window.ws = ws; 

export default ws; 
