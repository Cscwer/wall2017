// LsObject.js
import LsHandle from './LsHandle'; 

function LsObject(key, initObj){
	this.key = key; 

	if (initObj){
		LsHandle.set(key, initObj); 
	} else {
		let inLS = LsHandle.get(this.key);
		if (!inLS) LsHandle.set(key, {}); 
	}
}

LsObject.prototype.json = function(){
	return LsHandle.raw(this.key); 
}

LsObject.prototype.toObject = function(){
	return LsHandle.get(this.key); 
}

LsObject.prototype.set = function(propName, val){
	let temp = this.toObject(); 
	temp[propName] = val; 

	LsHandle.set(this.key, temp); 
}

LsObject.prototype.get = function(propName){
	return this.toObject()[propName]
}

export default LsObject; 
