// chat.js
import LsArray from '../ls/LsArray'; 
import LsObject from '../ls/LsObject';
import uuid from '../uuid'; 

let chat = {}; 
export default chat; 

let chatList = new LsArray('chat-list');
let appStatus = new LsObject('app-status'); 

// This Is APIs; 
chat.list      = chatList; 
chat.appStatus = appStatus;

function storeMsg(msg){
	var type = msg.type;
	if (type === 'chat'){
		// type is 个人聊天 
		let chatArr = new LsArray('chat-msgs-' + msg.from._id); 
		chatArr.push(msg); 

	} else if (type.startsWith === 'wish') {
		// type is 愿望动态类
		let wishMsg = new LsArray('wish-msgs'); 
		wishMsg.push(msg); 

	} else if (type.startsWith === 'system') {
		// type is 系统通知类 
		let sysMsg = new LsArray('system-msgs'); 
		sysMsg.push(msg); 
	} else {
		console.log('[ WARN ] 不可辨识的 msg 类型', msg); 
	}
}

function firstUp(msg){
	let chatListArr = chatList.toArray(); 
	let onIdx = null; 
	let remain = chatListArr.filter((chat, idx) => {
		return chat.from._id !== msg.from._id
	}); 

	// 重设 
	remain.unshift(msg); 
	chatList.replace(remain); 
}


chat.onMsg = function(msg){
	let type = msg.type; 

	if ('unread' in msg){
		msg.unread = false; 
	} else {
		msg.unread = true; 
	}
	
	appStatus.set('hasMsg', msg.unread);
	// msg._id = uuid(); 

	// Error 
	if (!type) return console.log('[ ERROR ] 错误的 server push 数据');

	// Store Msg To LS; 
	storeMsg(msg); 

	// 窗口提前 
	firstUp(msg); 

	// 回调设置 
	window.afterMsg && window.afterMsg(); 

	console.log('[ On Msg ]', msg); 
}
