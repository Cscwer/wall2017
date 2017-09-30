<template>
	<div class="music-container">
		<div v-if="showMp3" class="mp3">
			<img :src="bigSizeCover" class="cover" />
			<audio :src="music.url" controls="controls"></audio>			
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


export default {
	name: 'music', 
	data: function(){
		return {
			search: '',
			list: [],
			music: false, 
			showMp3: false
		}
	}, 
	created(){
		http.musicSearch({
			asd: 'asd', 
			keyword: '初音'
		}); 

		
	}, 
	methods: {
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

			http.musicDetail({
				hash: hash
			}).then(music => {
				this.music   =  music; 
				this.showMp3 =  true; 
			})
		}
	},
	computed: {
		bigSizeCover(){
			let album_img = this.music.album_img;

			if (album_img) return album_img.replace('{size}', '400'); 
			else return ''; 
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
</style>
