<template>
	<div class="music-container">
		<div class="music-header" v-if="music">
			<img class="inline-icon" :src="mtag_png" />

			<span v-if="music.kugou.fileName < 10">正在播放: {{ music.kugou.fileName }}</span>
			<span v-else>{{ music.kugou.fileName }}</span>

			<span class="new-music" @click="newMusic">我要点歌</span>
		</div>

		<div v-if="showMp3" class="mp3">
			<img :src="bigSizeCover" class="cover" />
			<audio :src="music.mp3" autoplay="autoplay" controls="controls"></audio>

			<div class="ta-said">
				他说 要有光
			</div>	
		</div>

		<div v-else class="list-container">
			<div class="search">
				<input type="text" v-model="search" placeholder="输入以搜索" />
				<div @click="toSearch" class="search-btn">搜索</div>
			</div>

			<ul class="list">
				<li v-for="(item, idx) in list" @click="toPlay(item)">
					{{ item.filename }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import wait from '@/utils/wait'; 
import http from '@/utils/http.client'; 
import ui from '@/utils/ui';
import mtag_png from '@/assets/music/mtag.png'; 


export default {
	name: 'music', 
	data: function(){
		return {
			search: '',
			list: [],
			music: false, 
			showMp3: false,
			mtag_png: mtag_png,
			onSearching: false
		}
	}, 
	created(){
		// http.musicSearch({
		// 	keyword: '初音'
		// }).then(res => {
		// 	console.log(JSON.stringify(res)); 
		// }); 

		// this.toPlay({
		// 	hash: '795f55870cea8e6f89c2bdd89a267d20',
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
	methods: {
		initPlay(){
			http.get('/api/music').then(res => {
				let music = res.data; 

				if (music) {
					this.music   =  music; 
					this.showMp3 =  true; 
				}
			}); 
		},
		newMusic(){
			this.onSearching = true; 

			ui.newMusic(this).then(music => {
				this.onSearching = false; 
				console.log('!', music); 
			}, cancel => {
				this.onSearching = false; 
				console.log('用户取消'); 
			}); 
			// console.log('我要点歌啦')
			// let ins = this.$popup.push({
			// 	type: 'prompt', 
			// 	needBlur: true
			// })
		},
		toSearch(){
			console.log(this.search)
			http.musicSearch({
				keyword: this.search
			}).then(res => {
				this.list = res.data.info; 
			}); 
		},
		toPlay(item){
			let { hash } = item; 

			http.post('/api/music', {
				hash: hash
			}).then(res => {
				let music = res.data; 

				if (music){
					this.music   =  music; 
					this.showMp3 =  true; 
				} else {
					// 点歌人数已满 明天再来 
				}
			})
		}
	},
	computed: {
		bigSizeCover(){
			let cover = this.music.cover;
			let album_img = this.music.album_img; 

			if (cover) return cover.replace('{size}', '400'); 
			else if (album_img) return album_img.replace('{size}', '400'); 
			else return 'NO_IMG'; 
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.list-container {
	padding: 1em 0; 
}

.cover {
	width: 100%; 
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
</style>
