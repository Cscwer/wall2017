// ws.client.js
import cookie from '../cookie';
import chat from '../chat';
import Vue from 'vue';
import LsHandle from '../ls/LsHandle'; 

let wsurl = location.origin;

if (wsurl.indexOf('https') === -1){
	// http
	wsurl = 'http://192.168.199.242:6677';
}

const USER_TOKEN = cookie.get('user-token')
    , socket = io(wsurl + '/?user_token=' + USER_TOKEN)
    , ws = {
		socket: socket,
		user: null,
		bus: new Vue()
	}

function dataInit(kefu){
	var inited = window.localStorage.getItem('inited');

	if (inited){
		// 初始化过了 
		return ;
	} else {
		// 未初始化的 
		window.localStorage.setItem('inited', '✔'); 

		LsHandle.set('chat-list', [{
			"type": "chat",
			"from": kefu,
			"content": "客服小哥为您带来真诚问候",
			"create_at": new Date(),
			"unread": true
		}]);
	}
}

ws.ready = new Promise((res, rej) => {
	socket.on('login-success', function(info){
		let { user, unreads, kefu } = info;
		console.log('[ login-success ]', info);
		ws.user = user;

		// Init Data; 
		dataInit(kefu); 

		// On Msg;
		unreads.forEach(chat.onMsg);

		res(info);
	});
})



socket.on('revMsg', function(msg){
	// console.log('revMsg');
	// console.log(msg);
	ws.bus.$emit('onMsg', msg);
});


window.ws = ws;
// On Msg;
socket.on('revMsg', chat.onMsg);


// window.ws = ws;

export default ws;
