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

export default ui; 
