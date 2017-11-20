// ui.js
import GwPopup from '@/GwPopup';
import MyInfo from '@/components/MyInfo';
import vwx from './vwx';

let ui = {};

function copy(o){
	return JSON.parse(JSON.stringify(o));
}

ui.editUserInfo = function(toEdit, force){
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
					if(!/^1[3|4|5|7|8][0-9]{9}$/.test(toEdit.phone)) {
						GwPopup.getPopup().toast({
							msg: "请正确填写手机号，方便领取愿望之后找到你哦",
							align: true,
							cancelable: true,
							position: 'bottom'
						})
					} else if(!/^[a-z_\d]+$/.test(toEdit.weid)) {
						GwPopup.getPopup().toast({
							msg: "请正确填写微信号，方便领取愿望之后找到你哦",
							align: true,
							cancelable: true,
							position: 'bottom'
						})
					} else {
						res(copy(toEdit));
						this.close();
					}
				},
				cancel(e){
					rej();
					console.log("cancel");
					if(!/^1[3|4|5|7|8][0-9]{9}$/.test(toEdit.phone)) {
						GwPopup.getPopup().toast({
							msg: "请正确填写手机号，方便领取愿望之后找到你哦",
							align: true,
							cancelable: true,
							position: 'bottom'
						})
					} else if(!/^[a-z_\d]+$/.test(toEdit.weid)) {
						GwPopup.getPopup().toast({
							msg: "请正确填写微信号，方便领取愿望之后找到你哦",
							align: true,
							cancelable: true,
							position: 'bottom'
						})
					};
					if(!force) this.close();

				}
			}
		})

		instance.launch();
	})
}


import PostWish from '@/components/PostWish';

function checkWish(data){
	if (data.text === ''){
		return false;
	}

	return true;
}

ui.postWish = function(){
	let wish = {
		text: '',
		img: '',
		wishtype: 0
	}

	return new Promise((res, rej) => {
		let open = GwPopup.getPopup().push({
			type: 'prompt',
			component: PostWish,
			needBlur: true,
			confirmText: '发布',
			binding: {
				wish: wish
			},
			handle: {
				confirm(e){
					let toCheck = copy(wish);

					console.log('Get Wish', toCheck);

					if (checkWish(toCheck)){
						res(toCheck);
						this.close();
					} else {
						GwPopup.getPopup().toast({
					        msg: '还有信息没填呢 ~ 请检查输入',
					        position: 'bottom',
					        cancelable: true,
					        align: true,
					        duration: 4000
					    });
					}
				},
				cancel(err){
					rej(err);
					this.close();
				}
			}
		});

		open.launch();
	});
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
					var msg = null;
					if (music.content.length === 0){
						msg = '请输入你想要说的话';
					} else if (!music.selected) {
						msg = '请点歌后再操作'
					} else {
						res(copy(music));
						this.close();
					}

					msg && GwPopup.getPopup().toast({
						msg: msg,
						position: 'bottom'
					});
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

import choose from '@/components/chooseLove';

ui.chooseLover = function() {
	let input = {
		lover: ''
	}

	return new Promise((res, rej) => {
		console.log('promise');
		let tabLover = GwPopup.getPopup().push({
			type: 'prompt',
			confirmText: '确定',
			needBlur: true,
			component: choose,
			binding: {
				input: input
			},
			handle: {
				confirm(){
					console.log(input.lover);
					if(!input.lover.trim()) {
						GwPopup.getPopup().toast({
					        msg: '输入值不能为空啦~',
					        position: 'bottom',
					        cancelable: true,
					        align: true,
					        duration: 3000
					    });
					    return ;
					}
					ui.loversList(input.lover).then(person => {
						console.log('in ui person', person);
						res(person);
						this.close();
					});
				},
				cancel(){
					// rej();
					this.close();
				}
			}
		});
		tabLover.launch();
	})
}

import lovers from '@/components/loversList';

ui.loversList = function(keyword) {
	let input = {
		keyword: keyword
	}

	return new Promise((res, rej) => {
		console.log('lover promise');
		let tabLover = GwPopup.getPopup().push({
			type: 'confirm',
			confirmText: '这里没有TA',
			needBlur: true,
			component: lovers,
			binding: {
				input: input
			},
			event: {
				finishChoose(person){
					console.log('ui loverlist finishChoose', person);
					res(person);
					tabLover.close();
				}
			},
			handle: {
				confirm(confirm){
					// res();
					console.log("这里没有TA ui");
					ui.share().then(() => {
						this.close();
					});
				},
				cancel(){
					// rej();
					this.close();
				}
			}
		});
		tabLover.launch();
	})
}

ui.share = function() {
	let noticeTa = GwPopup.getPopup().push({
		type: 'prompt',
		confirmText: '去告诉TA',
		needBlur: true,
		component: {
			template: `<div style="text-align: center; margin: 1rem auto;">
							<p style="font-size: 18px; color: #bbb; text-align: center;">TA还没来过许愿墙哦，</p>
							<p style="font-size: 18px; color: #bbb; text-align: center;">快去告诉TA吧~</p>
						</div>`,
			methods: {
				close(){
					this.$emit('close');
				}
			}
		},
		handle: {
			confirm(){
				console.log("去告诉她");
				vwx.share();
				this.close();
			},
			cancel(){
				this.close();
			}
		}
	});
	noticeTa.launch();
}



vwx.share();


ui.showLoading = function(d = 8000){
	let loading = GwPopup.getPopup().push({
		type: 'loading'
	});

	loading.launch();

	function cancel(){
		loading.close();
	}

	setTimeout(cancel, d);

	return cancel;
}

ui.topLoading = function(d = 8000){
	let loading = GwPopup.getPopup().push({
		type: 'top-loading',
		transitionName: 'gw-top-loading'
	});

	loading.launch();

	function cancel(){
		loading.close();
	}

	setTimeout(cancel, d);

	return cancel;
}

export default ui;
