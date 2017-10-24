// ui.js
import GwPopup from '@/GwPopup'; 
import MyInfo from '@/components/MyInfo'; 

let ui = {}; 

function copy(o){
	return JSON.parse(JSON.stringify(o)); 
}

ui.editUserInfo = function(toEdit){
	toEdit = toEdit || {
		nickname: '',
		area: '',
		weid: '',
		phone: ''
	}

	return new Promise((res, rej) => {
		let instance = GwPopup.getPopup().push({
			type: 'prompt', 
			confirmText: '保存', 
			component: MyInfo,
			needBlur: true, 
			binding: {
				toEdit: toEdit
			},
			handle: {
				confirm(e){
					res(copy(toEdit)); 
					this.close(); 
				},
				cancel(e){
					rej(); 
					this.close(); 
				}
			}
		})

		instance.launch(); 
	})
}

import NewMusic from '@/components/NewMusic'; 

ui.newMusic = function(){
	let music = {
		content: '',
		selected: null
	}
	
	return new Promise((res, rej) => {
		let i = GwPopup.getPopup().push({
			type: 'prompt', 
			needBlur: true, 
			confirmText: '马上点歌',
			component: NewMusic,
			binding: {
				music: music
			},
			handle: {
				confirm(e){
					res(copy(music)); 
					this.close(); 
				},
				cancel(){
					rej(); 
					this.close(); 
				}
			}
		}); 

		i.launch(); 
	});
}

import MusicSearch from '@/components/MusicSearch'; 
ui.openMusicSearch = function(){
	return new Promise((res, rej) => {
		let i = GwPopup.getPopup().push({
			type: 'modal', 
			needBlur: false, 
			component: MusicSearch,
			bg: 'rgb(255, 241, 241)',
			event: {
				finishSearch(data){
					res(data)
					i.close(); 
				}
			}
		}); 
		i.launch(); 
	});
}

ui.failPostMusic = function(){
	return GwPopup.getPopup().push({
		type: 'prompt', 
		confirmText: '明天再来', 
		needBlur: true, 
		component: {
			template: `
				<div class="post-music-fail">
					<p align-center>点歌失败！/(ToT)/~~</p>
					<p align-center>今天点歌人数已满啦 !</p>
					<p align-center>00:00 开始新一轮点歌哦！ 记得参加！</p>
					<p align-center>n(*≥▽≤*)n</p>
				</div>
			`
		},
		binding: {
			style: {
				'text-align': 'center', 
				'color': '#BBB',
				'margin-bottom': '1em'
			}
		}
	}).launch(); 
}

// ui.notice = function(){
// 	return GwPopup.getPopup().push({
// 		type: 'confirm', 
// 		confirmText: '哦哦', 
// 		needBlur: true,
// 		component: {
// 			template: `
// 				<p align-center>请勿发空消息喔</p>
// 			`
// 		},
// 		binding: {
// 			style: {
// 				'text-align': 'center',
// 				'margin': '2em 0'
// 			}
// 		}
// 	}).launch()
// }

ui.successPostMusic = function(n, date){
	let hours = ('00' + date.getHours()).slice(-2); 
	let mins = ('00' + date.getMinutes()).slice(-2);
	let playOn = hours + ':' + mins; 

	return GwPopup.getPopup().push({
		type: 'prompt', 
		confirmText: '好哒~', 
		needBlur: true, 
		component: {
			template: `
				<div class="post-music-fail">
					<p align-center>点歌成功啦！</p>
					<p align-center>O(∩_∩)O</p>
					<p align-center>您是今天第 ${n} 位点歌的同学</p>
					<p align-center>您的歌曲将于今天的 ${playOn} 播出</p>
					<p align-center>记得上来跟大家一起吐槽哦！</p>
				</div>
			`
		},
		binding: {
			style: {
				'text-align': 'center', 
				'color': '#BBB',
				'margin-bottom': '1em'
			}
		}
	}).launch(); 
}

export default ui; 
