<template>
	<div class="music-container">
		<div class="music-header" v-if="music">
			<img class="inline-icon" :src="mtag_png" />

			<span v-if="music.kugou.fileName < 10">正在播放: {{ music.kugou.fileName }}</span>
			<span v-else>{{ music.kugou.fileName }}</span>

			<span class="new-music" @click="newMusic">我要点歌</span>
		</div>
	

		<!-- V-IF MUSIC -->
		<div v-if="music" class="mp3" :style="{ height: screenWidth + 'px' }">
			
			<img :src="bigSizeCover" class="cover" :class="{
				'cover-inner': danmakuMode
			}" />
			
			<div class="danmaku-black-bg" :style="{
				'background-color': danmakuMode ? 'rgba(254, 181, 177, .2)' : 'rgba(254, 181, 177 ,0)'
			}"></div>


			<audio id="audio-player" @ended="musicEnded">
				<source v-if="music" :src="music.mp3">
			</audio>
			
			<div v-if="danmakuMode" class="danmaku-area" :style="{ height: screenWidth + 'px' }">
				<transition name="danmaku-init" v-for="(danma, idx) in danmakus" :key="idx">
					<div v-if="danma.active" class="danma-instance" :style="danma.style" >
						{{ danma.content }}
					</div>
				</transition>
			</div>

			<div class="music-user-content">
				<img class="music-user-avatar" :src="music.who.headimgurl" />

				<div class="name-content">
					<p class="music-user-name">{{ music.who.nickname }}</p>
					<p class="music-content">{{ music.content }}</p>
				</div>
			</div>
		</div>

		<div class="danmaku-controller">
			<div class="danmaku-button" @click="eMode = true, danmakuMode = true">
				说点什么呗~
			</div>

			<span>
				<label class="danmaku-label">弹幕</label>

				<span @click="danmakuMode = !danmakuMode">
					<ios-checkbox :value="danmakuMode"></ios-checkbox>
				</span>
			</span>
		</div>

		<div class="music-progress-container">
			<div class="progress-track music-progress">	
				<span class="had-play" :style="{
					width: (current / music.duration) * 100 + 1 + '%'
				}"></span>
				<span class="progress-ball" :style="{
					left: (current / music.duration) * 100 + '%'
				}"></span>
				<span class="total-time">{{ minSec }}</span>
			</div>
		</div>
		
		<transition name="on-danmaku-input">
			<div class="danmaku-input-popup" v-if="eMode" @click.self="eMode = false">
				<div class="danmaku-input-area"  @click.self>
					<input class="danmaku-text" id="__send-danmaku-input" placeholder="说点什么呗~" type="text"
						v-model="danmakuText" @keyup.enter.self="sendDanmaku" />
					<span class="send-danmaku" @click.self="sendDanmaku">发送</span>
				</div>
				<span class="color-slector" v-for="(color, idx) in colors" :style="{
					'background-color': color.val
				}" :class="{
					'color-selected': color.selected
				}" @click.self="colorOnSelecting(color)"></span>
			</div>
		</transition>

		<div class="bg-pink"></div>
	</div>
</template>

<script>
import wait from '@/utils/wait'; 
import http from '@/utils/http.client'; 
import ui from '@/utils/ui';
import mtag_png from '@/assets/music/mtag.png'; 
import vwx from '@/utils/vwx'; 
import danmaku from '@/utils/danmaku';

let timer = null; 

let colors = [
	{
		val: 'rgb(109, 60, 60)',
		selected: false
	}, 
	{
		val: 'rgb(248, 127, 121)',
		selected: false
	}, 
	{
		val: 'rgb(121, 241, 248)',
		selected: false
	}, 
	{
		val: 'rgb(202, 121, 248)',
		selected: false
	},
	{
		val: 'rgb(255, 255, 255)',
		selected: true
	}, 
	{
		val: 'rgb(116, 132, 234)',
		selected: false
	}, 
	{
		val: 'rgb(251, 255, 146)', 
		selected: false
	},	
	{
		val: 'rgb(74,  102, 104)',
		selected: false
	}
]

export default {
	name: 'music', 
	data: function(){
		return {
			search: '',
			list: [],
			music: false, 
			showMp3: false,
			mtag_png: mtag_png,
			onSearching: false,
			current: 0, 
			danmakuText: '',
			danmakuMode: true,
			danmakus: [],
			danmakuCtrl: null,
			colors: colors,
			eMode: false,
			screenWidth: window.innerWidth
		}
	}, 
	watch: {

	},
	created(){
		this.danmakuCtrl = danmaku.init(this); 

		// http.musicSearch({
		// 	keyword: '初音'
		// }).then(res => {
		// 	console.log(JSON.stringify(res)); 
		// }); 

		

		// this.toPlay({
		// 	hash: '13e76abea5e097e8f10fa321883840b4',
		// }); 
		this.initPlay(); 
	}, 
	// beforeRouteLeave(to, from, next){
	// 	if (this.onSearching){
	// 		// 关闭 	

	// 		next(false);
	// 	} else {
	// 		next();
	// 	}
	// },
	destroyed(){
		console.log('Bye');
		this.danmakuCtrl.bye(); 
		clearInterval(timer); 
	},
	methods: {
		musicEnded(){
			this.$router.go(0);
		},
		sendDanmaku(){
			let content = this.danmakuText; 
			this.danmakuText = ''; 

			
			let selectededColor = this.colors.filter(e => e.selected)[0]; 

			this.eMode = false; 

			this.danmakuCtrl.shot({
				content: content,
				style: {
					'color': selectededColor.val
				}
			});

			return false; 
		},
		colorOnSelecting(color){
			this.colors.forEach(color => color.selected = false); 
			color.selected = true; 
		},
		initPlay(){
			http.get('/api/music').then(res => {
				let music = res.data; 

				if (res.code === 2003){
					let cover = 'https://io.chenpt.cc/gw-init/album.jpg'; 

					this.music = {
						cover: cover, 
						mp3: 'https://io.chenpt.cc/gw-init/%E3%83%98%E3%82%AF%E3%81%A8%E3%83%91%E3%82%B9%E3%82%AB%E3%83%AB%20-%20fish%20in%20the%20pool%20%E3%83%BB%E8%8A%B1%E5%B1%8B%E6%95%B7.mp3', 
						duration: 276,
						n: 0,
						start_at: parseInt(Date.now() % 86400000 / 1000),
						kugou: {
							album_img: cover, 
							singerName: '', 
							songName: '',
							fileName: 'fish in the pool ・花屋敷'
						},
						content: '女生节快乐', 
						who: {
							headimgurl: cover,
							nickname: 'Admin'
						}
					}
				} else {
					this.music = music; 
				}

				this.showMp3 =  true; 
				this.initPlayer(); 
			}); 
		},
		initPlayer(){
			let now = parseInt(Date.now() % 86400000 / 1000); 

			this.$music && this.$music.pause(); 

			vwx.config(() => {
				let start_at = this.music.start_at;
				let now_at = now - start_at; 
				let $music = document.getElementById('audio-player'); 
				this.$music = $music; 

				// window.$music = $music; 

				console.log('now_at', now_at); 

				$music.play(); 
				$music.currentTime = now_at;

				clearInterval(timer); 
				timer = setInterval(() => {
					this.current = $music.currentTime;
				}, 500); 
			}, err => {
				console.log(err)
			})

		},
		newMusic(){
			this.onSearching = true; 

			ui.newMusic(this).then(music => {
				this.onSearching = false; 
				// console.log('!', music); 
				let hash = music.selected.hash; 
				let content = music.content; 

				this.toPlay({
					hash: hash,
					content: content
				}); 
			}, cancel => {
				this.onSearching = false; 
				console.log('用户取消'); 
			}); 
		},
		toPlay(item){
			http.post('/api/music', item).then(res => {
				let music = res.data; 

				if (res.code === 2000){
					let now_time = Date.now(); 
					let { duration, mp3, n, start_at } = music; 
					let will_at = new Date(
						parseInt(Date.now() / 86400000) * 86400000 + 
						start_at * 1000
					); 

					console.log(will_at); 

					// if (now_time > (+will_at) + duration * 1000){
						// 错过了 重试 
						// ui.failPostMusic(); 
						// this.$router.go(0);
					// } else {
					
					ui.successPostMusic(n, will_at); 

					if (now_time > (+will_at)) {
						console.log('!!'); 
						setTimeout(() => {
							this.$router.go(0); 
						}, 500)
					}
					// this.$router.go(0);
					// }

					// this.music   =  music; 
					// this.showMp3 =  true; 
				} else {
					// 点歌人数已满 明天再来 
					ui.failPostMusic(); 
				}
			})
		},
		scroll2Top(){
			setTimeout(() => {
				document.body.scrollTop = document.documentElement.scrollTop = 0;
			}, 500)
		}
	},
	computed: {
		bigSizeCover(){
			let cover = this.music.cover;
			let album_img = this.music.album_img; 
			let imgUrl = this.music.imgUrl; 

			if (cover) return cover.replace('{size}', '400'); 
			else if (album_img) return album_img.replace('{size}', '400'); 
			else if (imgUrl) return imgUrl.replace('{size}', '400'); 
			else return 'NO_IMG'; 
		},
		minSec(){
			let duration = this.music.duration; 

			let sec = ('00' + parseInt(duration % 60)).slice(-2); 
			let min = ('00' + parseInt(duration / 60)).slice(-2); 

			return '' + min + ':' + sec; 
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.danmaku-input-popup {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 800; 
	background-color: rgba(0, 0, 0, .5);
}

.color-slector {
	display: inline-block;
	width: 20%; 
	margin: 4px 2.5%;
	border-radius: 10px; 
	height: 3em; 
	box-sizing: border-box;
}

.danmaku-input-area {
	display: flex;
	justify-content: space-between;
	/*padding: 0 0 0 ;*/
	padding-left: 20px; 
	line-height: 36px;
	background-color: rgb(238, 236, 236);
	color: rgb(255, 171, 166);
}

.danmaku-text {
	box-sizing: border-box;
	padding: .4em 1em; 
	width: 60%; 
	border-radius: 100px; 
	border: none;
	background-color: rgb(238, 236, 236); 
	color: rgb(255, 171, 166);
	-webkit-appearance: none;
}

.danmaku-button {
	box-sizing: border-box;
	padding: .4em 1em; 
	width: 60%; 
	border-radius: 100px; 
	border: none;
	background-color: #FFF; 
	color: rgb(197, 196, 196);
	-webkit-appearance: none;
}

.send-danmaku {
	padding-left: 20px; 
	padding-right: 20px;
}

.color-selected {
	border: 3px solid rgb(255, 141, 135);
}

.mp3 {
	position: relative;
    overflow: hidden;
	font-size: 0;
}

.bg-pink {
	position: fixed;
	top: 0;
	left: 0; 
	width: 100%; 
	height: 100%; 
	z-index: -9; 
	background-color: rgb(255, 247, 247);
}

.list-container {
	padding: 1em 0; 
}

.cover {
	position: absolute;
	width: 100%; 
	transition: all .3s; 
}

.cover-inner {
	transform: scale(1.1);
	filter: blur(3px);
}

.search {
	padding: 0 2em; 
}

.list {
	text-align: left; 
	padding: 0 2em; 
}

.list > li {
	line-height: 1.5; 
	font-size: 16px;
	margin-bottom: 1em; 
}

.search-btn {
	display: block;
	width: 100%; 
	font-size: 18px; 
	
	color: #FFF; 
	margin: 1em 0; 
	padding: .4em 0; 
	background-color: rgb(43, 156, 183);
}

.search > input {
	display: block;
	width: 100%; 
	padding: .2em .4em; 
	box-sizing: border-box;
	font-size: 18px; 
}

.music-header {
	/*line-height: 48px; */
	position: relative;
	font-size: 16px;
	padding: 14px 1em;
	background-color: rgb(255, 171, 166);
	color: #FFF; 
}

.new-music {
	position: absolute;
	right: 1em; 
	font-size: 12px; 
	padding: 4px 8px; 
	/*margin-top: -4px; */
	top: 50%; 
	transform: translateY(-50%);
	
	border-radius: 20px;
		
	background-color: #FFF; 

	color: rgb(255, 171, 166);
}

.inline-icon {
	height: 1em; 
	margin-top: -.2em; 
	padding-right: .2em; 
	vertical-align: middle;
}

.music-progress-container {
	padding: 0 5%; 
}

.music-progress {
	position: relative;
	background-color: rgb(233, 206, 205);
	height: 4px; 
	margin-right: 4em; 
	border-radius: 2px; 
}

.total-time {
	position: absolute;
	right: -4em; 
	top: 3px; 
	color: rgb(255, 122, 122);
	line-height: 0; 
}

.progress-track {
	border-radius: 2px; 
}

.progress-ball {
	position: absolute;
	display: block;
	top: -3px; 
	width: 10px;
	height: 10px;
	border: 1px solid rgba(0, 0, 0, 0.05);
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .1); 
	border-radius: 100px;
	background-color: #FFF; 
}

.had-play {
	position: absolute;
	left: 0;
	top: 0;
	height: 4px;
	background-color: rgb(255, 81, 72);
}

.danmaku-controller {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: .5em 0 ;
	margin: 0 auto;
	width: 90%; 
	margin-bottom: 1em; 
}

.danmaku-label {
	padding-right: 4px; 
	vertical-align: middle;
	color: #CCC; 
}

.danmaku-area {
	/*position: absolute;*/
	overflow: hidden;
	font-size: 16px; 
	top: 0;
	left: 0; 
	width: 100%; 
	height: 100%; 
}

.danmaku-black-bg {
	content: "";
	position: absolute;
	top: 0;
	left: 0; 
	width: 100%;
	height: 100%; 
	transition: all .3s; 
}

.danma-instance {
	position: absolute;
	z-index: 800; 
	word-wrap: break-word;
	white-space: nowrap;
	left: 100%; 
}

.music-user-content {
	position: absolute;
	font-size: 16px; 
	padding-left: 50px; 
	box-sizing: border-box;
	bottom: 0;
	left: 5%; 
	width: 90%; 
	min-height: 100px; 
	/*background-color: #BBB;  */
}

.music-user-avatar {
	position: absolute;
	left: 0px; 
	width: 50px; 
	border-radius: 50px; 
	font-size: 0; 
}

.name-content {
	line-height: 1.5; 
	padding: 0 .5em; 
	margin-bottom: 1em; 
}

.music-user-name {
	color: #FFF; 
	text-shadow: 0 0 6px rgba(0, 0, 0, .8)
}

.music-content {
	background-color: rgba(255, 255, 255, .8);
	padding: .25em .8em; 
	min-height: 4em; 
	color: rgb(221, 152, 148);
	border-radius: 0 16px 16px 16px; 
	word-wrap: break-word;
}

.danmaku-init-enter-active  {
/*	transition: all 3s; 
	transition-timing-function: linear;*/
}

.danmaku-init-leave-active {
	transition: all 3s; 
	
	transition-timing-function: linear;	
}

.danmaku-init-enter {
	left: 0%;
}

.danmaku-init-leave-to {
	left: 0%;

	transform: translateX(-100%);
}

.on-danmaku-input-enter-active, .on-danmaku-input-leave-active {
	transition: all .3s; 
	/*top: 100%; */

}

.on-danmaku-input-enter {
	top: 100%; 
}

.on-danmaku-input-leave-to {
	transform: scale(1.5);
	opacity: 0; 
}

.fade-outter-enter-active, .fade-outter-leave-active {
	transition: all .3s; 
}

.fade-outter-enter, .fade-outter-leave-to {
	opacity: 0;
}




</style>
