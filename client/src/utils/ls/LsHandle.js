// LsHandle.js
let wls = window.localStorage; 
var get = key => JSON.parse(wls.getItem(key)); 
var set = (key, obj) => wls.setItem(key, JSON.stringify(obj)); 
var raw = key => wls.getItem(key); 

export default {
	get, set, raw
}
