// dom_util
// Load Css: 
require('./base.css'); 

let util = {}; 

util.createRoot = function(){
	let body = document.getElementsByTagName('body')[0]; 
	let $popup = document.createElement('div');
	
	body.appendChild($popup);

	return $popup; 
}

var $html = document.getElementsByTagName('html')[0];
var scrollTop = 0;
var ok = false; 

util.banScroll = function(){
	setTimeout(() => {
		console.log('[ Ban Scroll ]', $html.scrollTop); 
		scrollTop = $html.scrollTop; 
		$html.setAttribute('class', 'banScroll'); 

		ok = true; 
	}, 300); 
}

util.enableScroll = function(){
	if (!ok) return; 

	ok = false; 
	
	console.log('[ Enable Scroll ]', scrollTop);
	$html.setAttribute('class', ''); 
	setTimeout(() => {
		$html.scrollTop = scrollTop; 
	})
}

// setTimeout(() => {
// 	util.banScroll(); 
// }, 2500);

export default util; 
