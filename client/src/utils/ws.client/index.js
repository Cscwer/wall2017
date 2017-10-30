// ws.client.js
<<<<<<< HEAD
import cookie from '../cookie';
=======
import cookie from '../cookie'; 
import chat from '../chat'; 
>>>>>>> 61987ea424c8bd09810a01cea06dfc3eee2ac5f8

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

<<<<<<< HEAD
		res(info);
=======
		// On Msg; 
		unreads.forEach(chat.onMsg); 

		res(info);		
>>>>>>> 61987ea424c8bd09810a01cea06dfc3eee2ac5f8
	});
})


<<<<<<< HEAD

socket.on('revMsg', function(msg){
	console.log('revMsg');
	console.log(msg);
});


window.ws = ws;
=======
// On Msg; 
socket.on('revMsg', chat.onMsg);


// window.ws = ws; 
>>>>>>> 61987ea424c8bd09810a01cea06dfc3eee2ac5f8

export default ws;
