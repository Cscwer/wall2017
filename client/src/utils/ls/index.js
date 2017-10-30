let wls = window.localStorage; 
let ls = {}; 

// Read & Write From `wls` 
var get = key => JSON.parse(wls.getItem(key)); 
var set = (key, obj) => wls.setItem(key, JSON.stringify(obj)); 

ls.get = get; 
ls.set = set; 

// Push Data 
ls.pushTo = function(key, unread){
	let unreads = wls.getItem(key) || []; 

	// Push Data To Unreads
	let n = unreads.push(unread); 

	set(key, unreads); 

	return n; 
}

ls.popFrom = function(key){
	let unreads = wls.getItem(key) || []; 

	// Push Data To Unreads
	let temp = unreads.pop(); 

	set(key, unreads); 

	return temp; 
}



export default ls; 
