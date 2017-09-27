// wait.js
function wait(t = 100){
	return new Promise(res =>{
		setTimeout(() => {
			res(true); 
		}, t)
	})
}

module.exports = wait; 
