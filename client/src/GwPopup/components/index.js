// popupComponents.js
import GwAlert from './GwAlert'; 
import GwConfirm from './GwConfirm'; 
import GwPrompt from './GwPrompt'; 
import GwModal from './GwModal';
import GwAlertSheet from './GwAlertSheet'; 
import GwLoading from './GwLoading'; 
import GwTopLoading from './GwTopLoading';

let list = {
	'gw-alert': GwAlert, 
	'gw-confirm': GwConfirm,
	'gw-prompt': GwPrompt, 
	'gw-modal': GwModal, 
	'gw-alert-sheet': GwAlertSheet,
	'gw-loading': GwLoading,
	'gw-top-loading': GwTopLoading
}

let components = {};

components.register = function(Vue){
	Object.keys(list).forEach(key => {
		Vue.component(key, list[key]); 
	})
}

export default components; 
