// danmaku.js 
import ws from '../ws.client'; 

let danmaku = {}; 
let vm = null; 
danmaku.init = function(_vm){
	vm = _vm; 

	// 连接到弹幕频道
	ws.socket.emit('join-danmaku');

	ws.socket.on('shot', danmaku.on); 

	return danmaku; 
}

danmaku.on = function(e){
	if (!vm) return; 

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
	} else {
		console.log('[ WARN ] this danma has no content');
	}
}

danmaku.shot = function(e){
	if (!vm) return; 
	// vm.danmakus.push(e); 

	ws.socket.emit('shot', e);
}




export default danmaku; 
