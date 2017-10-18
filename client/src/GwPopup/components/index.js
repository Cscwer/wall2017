// popupComponents.js
import GwAlert from './GwAlert'; 
import GwConfirm from './GwConfirm'; 
import GwPrompt from './GwPrompt'; 

let list = {
	'gw-alert': GwAlert, 
	'gw-confirm': GwConfirm,
	'gw-prompt': GwPrompt
}

let components = {};

components.register = function(Vue){
	Object.keys(list).forEach(key => {
		Vue.component(key, list[key]); 
	})
}

export default components; 
