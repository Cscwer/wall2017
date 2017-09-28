// logger.js

// logger
var logger = {}; 

var pathFilter = path => '/' + path.split('//').pop().split('/').slice(1).join('/'); 

logger.req = (path, data) => {
	path = pathFilter(path); 
	console.groupCollapsed.call(console,
		` %c [${new Date().toLocaleTimeString()}] HTTP 请求 %c ${path}     `,
		`background: #6E9;color: #222`, 'background: #6E9;color:#F00'
	);
		console.log(data); 
		console.log('>>>>', 'To:', path); 
	console.groupEnd(); 
}

logger.res = (path, httpRes) => {
	httpRes = JSON.parse(
		JSON.stringify(httpRes)
	); 
	
	path = pathFilter(path); 
	console.groupCollapsed(
		` %c [${new Date().toLocaleTimeString()}] HTTP 响应 %c ${path} ${httpRes.status} `,
		`background: #222;color: #6E9`, `background: #222;color: #FBB`
	);
	console.log(httpRes.data);
	console.log('<<<<', 'From:', path)
	// console.log(httpRes); 
	console.groupEnd(); 
}

export default logger; 
