// LsArray.js
import LsHandle from './LsHandle'; 

function LsArray(key, initArr){
	this.key = key; 

	if (initArr){
		LsHandle.set(key, initArr); 
	} else {
		let inLS = LsHandle.get(this.key);
		if (!inLS) LsHandle.set(key, []); 
	}
}

LsArray.prototype.push = function(val){
	let arr = LsHandle.get(this.key); 
	let n = arr.push(val); 

	LsHandle.set(this.key, arr); 

	return n; 
}

LsArray.prototype.push = function(val){
	let arr = LsHandle.get(this.key); 
	let n = arr.unshift(val); 

	LsHandle.set(this.key, arr); 

	return n; 
}

LsArray.prototype.pop = function(){
	let arr = LsHandle.get(this.key); 
	let val = arr.pop(); 

	LsHandle.set(this.key, arr); 

	return val; 
}

LsArray.prototype.shift = function(){
	let arr = LsHandle.get(this.key); 
	let val = arr.shift(); 

	LsHandle.set(this.key, arr); 

	return val; 
}

LsArray.prototype.replace = function(newArr){
	return LsHandle.set(this.key, newArr); 
}

LsArray.prototype.toArray = function(){
	return LsHandle.get(this.key); 
}

LsArray.prototype.findAndMap = function(idx, fn) {
	let arr = LsHandle.get(this.key);

	arr[idx] = fn(arr[idx]);

	this.replace(arr);
}
export default LsArray; 
