// responser/index.js
let responser = {}; 
let code2msg = {
	2000: '接口调用成功', 
	2001: '分页到底了', 
	2002: '已受理 接口忙绿 请递归轮询', 
	2003: '当前电台空闲可供点歌喔', 
	
	4000: '参数错误, 请检查输入',
	4001: 'token 无效或过期', 
	4004: '查询无结果, 接口调用失败', 
	4005: '该接口只能调用一次请勿重复调用',
	4003: '权限不足, 拒绝访问', 

	4100: '请勿暗恋自己喔', 
	4101: '现在只有女生才能许愿喔 ~ ',
	4102: '今日点歌人数已满，请明天再来 ~ ', 
	4103: '微信没有设置性别，请先设置性别后再调用此接口', 
	4104: '该用户没有设置性别 ~ 无法访问', 
	4105: '该愿望不是此接口所期望的状态，无法完成操作',
	4106: '只有男生才可以领取愿望',
	4107: '只有发布该愿望的人才可以确认完成',
	4108: '哎呀，来晚了，愿望被人领走了', 
	4109: '听说你要帮客服君实现愿望？',

	5000: '内部错误', 
	5005: '数据库错误', 
	5006: 'MP3 解码内部错误', 
	5007: '图片抓取失败', 
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
