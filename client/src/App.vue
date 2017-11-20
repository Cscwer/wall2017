<template>
	<div id="app">
		<div :class="{ isBlur: popup.isBlur }" class="blur-area">
			<router-view :style="{
					'padding-bottom': tabHeight
				}"
				class="tab-page">
			</router-view>


			<transition name="fooload">
			<footer class="footer-tabs" v-if="showFooter">
				<div :class="{
						'tab': true,
						'tab-middle': tab.path === '/wish',
						'tab-active': tab.active,
						'shake-animation': tab.onMsg
					}"

					v-for="(tab, idx) in tabs"
					@click="routeTo(tab, idx)">
					<!-- {{ tab.text }} -->
					<img class="tab-icon" :src="tab.active ? tab.icon.fill : tab.icon.outline">
				</div>


				<transition name="cantLoad">
					<div class="just-girl" v-if="showCant" :style="{
						bottom: ((pageWidth / 4) - 4) + 'px'
					}">11月24号男女权利反转，男生也可以许愿了哦！</div>
				</transition>
			</footer>
			</transition>
		</div>
	</div>
</template>

<script>
import ui from '@/utils/ui';
import http from '@/utils/http.client';
import chat from '@/utils/chat';
import { tabs, appCtrl } from '@/utils/app.status';
import SelectSex from './components/SelectSex';

let tabHeight = (window.innerWidth / 4) + 'px';

// window.tabs = tabs;

export default {
	name: 'app',
	data(){
		return {
			tabHeight: tabHeight,
			tabs: tabs,
			popup: {
				isBlur: false
			},
			pageWidth: window.innerWidth,
			status: null,
			showFooter: false,
			me: null,
			showCant: false
		}
	},
	created(){
		this.updateIcon();

		// Object Init
		this.status = chat.appStatus.toObject();

		http.get('/api/user/me').then(res => {
			this.me = res.data;
			if(this.me.sex === 0 ) {
				this.$popup.toast({
					msg: "为了方便使用本网页，请更新个人信息",
					align: true,
					position: 'bottom',
					duration: 5000
				})
				this.editSex();

			}

		}).catch(err => {
			location.href = '/api/entry';
		});

		setTimeout(() => {
			this.showFooter = true
		}, 700);
	},
	watch:{
		// onChnaging Route Path
		$route(to, from){
			this.updateIcon();
		}
	},
	methods: {
		routeTo: function(tab, idx){
			let { path, onMsg } = tab;

			if (path === '/wish') {
				this.openWish();
				return;
			}

			if (onMsg){
				onMsg = false;
				appCtrl.off(`${path}-hasMsg`);
			}

			this.$router.push({
				path: path
			});
		},
		editSex: function() {
			let edit = this.$popup.push({
				type: 'confirm',
				confirmText: null,
				needBlur: true,
				component: SelectSex,
				event: {
					'finish': sex => {
						http.post('/api/user/init_sex',{
							sex: sex
						}).then(res => {
							edit.close();
							if(res.data === 2000) {
								this.$popup.toast({
									msg: "设置成功！",
									position: 'bottom'
								});
							}
						})
					}
				},
				handle: {
					confirm(){},
					cancel(){
						console.log('no')
						this.close();
					}
				}
			});
			edit.launch();
		},
		openWish(){
			if (this.me.sex === 1){
				// 男的叼毛
				this.canWishNow();
			} else {
				ui.postWish().then(wish => {
					http.post('/api/wish', wish, ui.topLoading()).then(res => {
						if (res.code === 2000){
							this.$popup.toast({
								msg: '许愿成功 ~ 请到主页查看',
								position: 'bottom'
							});
						} else {
							this.$popup.toast({
								msg: `许愿失败请重试 errcode: ${res.code}`,
								position: 'bottom',
								cancelable: true,
								duration: 99999
							});
						}
					});
				});
			}
		},

		canWishNow(){
			if (this.showCant) return;

			this.showCant = true;

			setTimeout(() => {
				this.showCant = false
			}, 2500);
		},

		updateIcon(){
			let nowPath = this.$route.path;

			this.tabs.forEach(tab => {
				tab.active = tab.path === nowPath
			});
		},

		popupMsg(data){
			console.log(data);
			this.popup.isBlur = data.isBlur;
		}
	}
}
</script>

<style>
#app {
	transition: filter .3s;
}

.blur-area {
	transition: filter .3s;
	/*transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);*/
}

.isBlur {
	filter: blur(3px);
}

.tab-active {
	color: #FFF;
}

.tab {
	/*position: relative;*/
	width: 25%;
	font-size: 0;
	text-align: center;
}

.tab-icon {
	width: 40%;
}

.tab-middle img {
	position: absolute;
	bottom: -.2em;
	left: 37.5%;
	width: 25%
}

.footer-tabs {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #FFF;
	display: flex;

	padding: .8em 0;
	align-items: center;
	z-index: 100;
	justify-content: space-between;

	transition: all .5s;
}


.fooload-enter-active, .fooload-leave-active {
	transition-timing-function: ease;
}

.fooload-enter, .fooload-leave-to {
	transform: translateY(200%);
}

.cantLoad-enter-active, .cantLoad-leave-active {
	/*transition-timing-function: cubic-bezier(0.74, 0, 0.36, 1.55);*/
	transition-timing-function: ease;
}

.cantLoad-enter, .cantLoad-leave-to {
	transform: translateY(100%);
	opacity: 0;
}




.tab-page {

}

.shake-animation {
	animation-name: shake_box;
	animation-duration: 1.2s;
	animation-timing-function: ease-in-out;
	animation-delay: .5s;
	animation-iteration-count: infinite;
}

@keyframes shake_box {
	0%, 50% {
		transform: translateY(0%) rotate(0deg);
	}

	12.5% {
		transform: translateY(-10%) rotate(15deg);
	}

	25% {
		transform: translateY(-20%) rotate(-15deg);
	}

	37.5% {
		transform: translateY(-40%) rotate(5deg);
	}

	42.5% {
		transform: translateY(-20%) rotate(-5deg);
	}

	100% {
		transform: translateY(0%) rotate(0deg);
	}
}

.just-girl {
	transition: all .3s;
	position: absolute;
	text-align: center;
	width: 46%;
	font-size: 10px;
	left: 27%;
	color: #FFF;
	box-sizing: border-box;
	background-color: rgb(255, 141, 135);
	border-radius: 10px;
	padding: .5em .8em;
}

.just-girl::after {
	content: "";
	position: absolute;
	width: 1em;
	height: 1em;
	bottom: -.5em;

	left: 50%;
	transform: translateX(-50%) rotate(45deg);
	background-color: rgb(255, 141, 135);
}


</style>
