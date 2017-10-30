// ws.client.js
import cookie from '../cookie';

let wsurl = location.origin;

if (wsurl.indexOf('https') === -1){
	// http
	wsurl = 'http://gw.chenpt.cc/socket.io';
}

const USER_TOKEN = cookie.get('user-token')
    , socket = io(wsurl + '/?user_token=' + USER_TOKEN)
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
