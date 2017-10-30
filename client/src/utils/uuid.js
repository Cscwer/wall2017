function uuid() {
	var length = 16; 
    var str = Math.random().toString(36).substr(2) + Date.now().toString(36)

	if (str.length >= length) {
		return str.substr(0, 36);
	} else {
		return uuid()
	}
}

export default uuid; 
