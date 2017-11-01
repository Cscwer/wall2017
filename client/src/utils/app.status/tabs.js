// tabIcons.js
import appCtrl from './app-ctrl'; 

let wishFill = require(`../../assets/tab/wish-fill.png`); 
let iconTable = [
	'home', 'me', 'music', 'ping'
].reduce((acc, name) => {
	let outline = require(`../../assets/tab/${name}-outline.png`); 
	let fill = require(`../../assets/tab/${name}-fill.png`); 

	acc[name] = {
		outline, 
		fill
	}; 

	return acc; 
}, {}); 

let tabs = [
	{
		text: '许愿',
		path: '/wall',
		active: true, 
		icon: iconTable.home,
		// onMsg: false
		onMsg: !!appCtrl.get('/wall-hasMsg')
	},
	{
		text: '电台',
		path: '/music',
		active: false,
		icon: iconTable.music,
		// onMsg: false
		onMsg: !!appCtrl.get('/music-hasMsg')
	},
	{
		text: '发布',
		path: '/wish',
		active: false,
		icon: {
			outline: wishFill, 
			fill: wishFill
		},
		onMsg: false
	},
	{
		text: '匹配', 
		path: '/love',
		active: false,
		icon: iconTable.ping,
		// onMsg: false
		onMsg: !!appCtrl.get('/love-hasMsg')
	},
	{
		text: '我的', 
		path: '/me',
		active: false,
		icon: iconTable.me,
		// onMsg: false
		onMsg: !!appCtrl.get('/me-hasMsg')
	}
]

export default tabs; 
