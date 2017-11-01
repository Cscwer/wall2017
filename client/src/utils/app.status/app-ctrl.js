// app-ctrl.js
import LsObject from '../ls/LsObject'; 

let appCtrl = {};
let appStatusLS = new LsObject('app-status'); 

appCtrl.toObject = function(){
	return appStatusLS.toObject(); 
}

appCtrl.get = key => appStatusLS.get(key); 

appCtrl.off = function(key){
	appStatusLS.set(key, false); 
}

appCtrl.on = function(key){
	appStatusLS.set(key, true); 
}

export default appCtrl; 
