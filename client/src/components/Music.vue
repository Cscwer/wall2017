<template>
	<div class="music-container">
		<!-- <p>{{ log }}</p> -->
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
			}"/>
			
			<div class="danmaku-black-bg" :style="{
				'background-color': danmakuMode ? 'rgba(254, 181, 177, .2)' : 'rgba(254, 181, 177 ,0)'
			}" @click="previewImg(bigSizeCover)"></div>


			<audio id="audio-player" @ended="musicEnded" @playing="musicStartPlay">
				<source :src="music.mp3">
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

		<div v-if="music" class="music-progress-container">
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

var cancel;
function startLoading(){
	cancel = ui.showLoading();
}

function endLoading(){
	cancel && cancel(); 
	cancel = null; 
}

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
			// log: 'asd'
		}
	}, 
	created(){
		// window.t = this; 
		startLoading(); 

		this.danmakuCtrl = danmaku.init(this); 
		this.initPlay(); 
	}, 
	destroyed(){
		console.log('Bye');
		this.danmakuCtrl.bye(); 
		clearInterval(timer); 
	},
	methods: {
		reload(){
			this.initPlay(); 
		},
		musicEnded(){
			// alert('ended'); 
			this.reload();
		},
		sendDanmaku(){
			// Get Input 
			let content = this.danmakuText; 

			// If It Is No Gooood... 
			if (content.length === 0){
				// 不能发送空消息 
				// ui.doNotSendNullMsg(); 
				this.$popup.toast({
					msg: '请勿发空弹幕喔',
					position: 'top',
					cancelable: true,
					align: true
				})
				return; 
			}

			// Drop Text Input 
			this.danmakuText = ''; 
			
			// Get Selected Color 
			let selectededColor = this.colors.filter(e => e.selected)[0]; 

			// And Close Edit Mode 
			this.eMode = false; 

			// And Sent The Msg To Danmaku Channel; 
			this.danmakuCtrl.shot({
				content: content,
				style: {
					'color': selectededColor.val
				}
			});

			return false; 
		},
		colorOnSelecting(color){
			// When Clicking Color Selector 
			this.colors.forEach(color => color.selected = false); 
			color.selected = true; 
		},
		initPlay(){
			// Init this.music 
			this.music = null; 
			http.get('/api/music').then(this.onMusicData); 
		},
		onMusicData(res){
			let music = res.data;
			if (res.code === 2003){
				// No Music, As Default 
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
				// Use Http Result 
				this.music = music; 
			}

			// Next Step Is To Init Player 
			this.initPlayer(); 
		},
		initPlayer(){
			// Now::Zero
			let now = parseInt(Date.now() % 86400000 / 1000); 

			// Not The First Time 
			if (this.$music) {
				console.log('!!! Stop')
				this.$music.pause();
			}

	
			// To Config To Play Music; 
			vwx.config(() => {
				let start_at = this.music.start_at;
				let now_at = now - start_at; 
				let $music = document.getElementById('audio-player'); 

				// Set Dom 
				this.$music = $music; 

				// And Log now_at 
				console.log('now_at', now_at); 

				// AutoPlay 
				$music.play(); 

				// AutoPlay For iOS 
				WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
					$music.play(); 
				});

				// And Set CurrentTime
				setTimeout(() => $music.currentTime = now_at, 300); 

				// For Progressing 
				clearInterval(timer); 
				timer = setInterval(() => {
					this.current = $music.currentTime;
				}, 500); 

			}, err => {
				// Error When Config 
				console.log('[ Error When Config ]', err);
			});
		},
		musicStartPlay(){
			console.log('[ Music onPlaying ]')
			endLoading(); 
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

					ui.successPostMusic(n, will_at); 

					if (now_time > (+will_at)) {
						console.log('!!'); 
						setTimeout(() => {
							this.reload()
						}, 1000)
					}

					// this.music   =  music; 
				} else {
					// 点歌人数已满 明天再来 
					ui.failPostMusic(); 
				}
			})
		},
		previewImg(u){
			// alert(u); 
			let urls = [
				this.music.cover,
				this.music.album_img,
				this.music.imgUrl
			].filter(e => !!e); 

			console.log(urls)
			vwx.previewImage({
				current: u, 
				urls: urls
			})
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
	z-index: 200; 
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
	overflow: hidden;
	position: relative;
	font-size: 16px;
	padding: 14px 1em;
	background-color: rgb(255, 171, 166);
	color: #FFF; 
	white-space: nowrap;
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
	width: 94%; 
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
	z-index: 199; 
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
	box-shadow: 0 10px 16px -4px rgba(0, 0, 0, .2);
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
	padding: .35em .8em; 
	min-height: 4em; 
	color: rgb(221, 152, 148);
	border-radius: 0 16px 16px 16px; 
	word-wrap: break-word;
	font-size: 14px;
	line-height: 1.28; 
	box-shadow: 3px 12px 16px -4px rgba(0, 0, 0, .2);
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
	/*top: 100%; */
	transform: translate3d(0, 100%, 0);
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
