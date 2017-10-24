// danmaku.js 
import cookie from '../cookie'; 
import ws from '../ws.client'; 

const USER_TOKEN = cookie.get('user-token')

let danmaku = {}; 
let vm = null; 

danmaku.init = function(_vm){
	vm = _vm; 

	console.log('On Component Init')
	ws.socket.emit('join-danmaku'); 
	
	return danmaku; 
}

ws.socket.on('shot', function(e){
	if (!vm) {
		console.log('On Connection But No VM Get It');
		return
	};

	console.log('[ On Danmaku ]', e); 
	if (e.content){
		e.style = e.style || {
			color: '#FFF'
		}; 

		// e.style.top = parseInt(Math.random() * 100) + '%';
		e.style.top = parseInt(Math.random() * 200) + 'px'; 

		e.active = true; 
		vm.danmakus.push(e); 
		setTimeout(() => e.active = false, 300); 
		setTimeout(() => {
			vm && vm.danmakus.pop(); 
		}, 3300); 
	} else {
		console.log('[ WARN ] this danma has no content');
	}
})



let n = 0; 
// danmaku.on = 

danmaku.shot = function(e){
	if (!vm) return; 
	ws.socket.emit('shot-send', e);
}

danmaku.bye = function(){
	vm = null 

	// Bye Bye 
	ws.socket.emit('leave-danmaku'); 
}

// window.danmaku = danmaku;
// window.vm = vm; 
// window.n = n; 

export default danmaku; 
