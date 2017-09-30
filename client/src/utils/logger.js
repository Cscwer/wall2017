// logger.js

// logger
var logger = {}; 

var pathFilter = path => '/' + path.split('//').pop().split('/').slice(1).join('/'); 

logger.req = (method, path, data) => {
	method = method.toUpperCase(); 

	path = pathFilter(path); 
	console.groupCollapsed.call(console,
		` %c [${new Date().toLocaleTimeString()}] %c${method} %c ${path}     `,
		`background: #6E9;color: #222`,
		`background: #6E9;color: #F00;`,
		`background: #6E9;color: #F00`
	);
		console.log(data); 
		console.log('>>>>', 'To:', path); 
	console.groupEnd(); 
}

logger.res = (method, path, httpRes) => {
	method = method.toUpperCase();

	httpRes = JSON.parse(
		JSON.stringify(httpRes)
	); 
	
	path = pathFilter(path); 
	console.groupCollapsed(
		` %c [${new Date().toLocaleTimeString()}] %c${method} %c ${path} ${httpRes.status} `,
		`background: #222;color: #6E9`,
		`background: #222;color: #FA9`,
		`background: #222;color: #FA9`
	);
	console.log(httpRes.data ? httpRes.data : httpRes);
	console.log('<<<<', 'From:', path)
	// console.log(httpRes); 
	console.groupEnd(); 
}

export default logger; 
