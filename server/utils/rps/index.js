// responser/index.js
let responser = {}; 
let code2msg = {
	2000: '接口调用成功', 
	4000: '参数错误, 请检查输入',
	4001: 'token 无效或过期', 
	4004: '查询无结果, 接口调用失败', 
	4005: '该接口只能调用一次请勿重复调用',
	4003: '权限不足, 拒绝访问', 

	4100: '请勿暗恋自己喔', 

	5000: '内部错误', 
	5005: '数据库错误', 
	5006: 'MP3 解码内部错误', 
	2002: '已受理 接口忙绿 请递归轮询', 
	5099: '未知错误，请联系我'
}

responser.send = code => (res, data = {}, error) => {
	let toSend = {}; 

	toSend.code = code; 
	toSend.data = data; 
	toSend.msg = code2msg[code]; 
	if (error) toSend.error = error; 

	res.json(toSend)
}

Object.keys(code2msg).forEach(code => {
	responser['send' + code] = responser.send(parseInt(code)); 
}); 

module.exports = responser; 
