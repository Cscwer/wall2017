<template>
	<div id="app">
		<div :class="{ isBlur: popup.isBlur }" class="blur-area">
			<router-view :style="{
					'padding-bottom': tabHeight
				}"
				class="tab-page">
			</router-view>

			<footer class="footer-tabs">
				<div
					:class="{
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
			</footer>
		</div>
	</div>
</template>

<script>
import ui from '@/utils/ui'; 
import http from '@/utils/http.client';
import chat from '@/utils/chat'; 
import { tabs, appCtrl } from '@/utils/app.status'; 

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
			status: null
		}
	},
	created(){
		this.updateIcon(); 

		// Object Init 
		this.status = chat.appStatus.toObject(); 
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

		openWish(){
			ui.postWish().then(wish => {
				http.post('/api/wish', wish).then(res => {
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

	justify-content: space-between;
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


</style>
