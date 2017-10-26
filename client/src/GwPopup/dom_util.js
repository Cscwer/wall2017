// dom_util
let util = {}; 

util.createRoot = function(){
	let body = document.getElementsByTagName('body')[0]; 
	let $popup = document.createElement('div');
	
	body.appendChild($popup);

	return $popup; 
}

export default util; 
