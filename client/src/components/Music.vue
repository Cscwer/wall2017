<template>
	<div class="music-container">
		<div v-if="showMp3" class="mp3">
			<img :src="bigSizeCover" class="cover" />
			<audio :src="music.mp3" controls="controls"></audio>			
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

// Promise.all(
// 	new Array(256).fill(0).map(() => {
// 		return http.get('/api/wish'); 
// 	})
// ).then(res => {
// 	console.log('All Done'); 
// })

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
		// http.musicSearch({
		// 	keyword: '初音'
		// }).then(res => {
		// 	console.log(JSON.stringify(res)); 
		// }); 

		// let hash = '6d93f084270ac0540cb84e43b00436dd';
		// Promise.all([
		// 	new Array(5).fill(0).map(() => {
		// 		return http.post('/api/music', {
		// 			hash: hash
		// 		}).then(res => {
		// 			if (res.code === 4102){
		// 				console.log('满了'); 
		// 			} else {
		// 				console.log('suc'); 
		// 			}
		// 		})
		// 	})
		// ])

		// for (var i = 0; i <= 2; i++){
		// let ts = 1400;
		// http.get('/api/music', {
		// 	ts: ts
		// }).then(res => {
		// 	let data = res.data; 
		// 	console.log('ts', ts); 
		// 	console.log('n', data.n); 
		// 	console.log('start_at', data.start_at); 
		// 	console.log('duration', data.duration); 
		// })

		// http.get('/api/system/usage')

		// }
		
		// var p = 0;
		// function ssss(){
		// 	p ++ ; 
		// 	p = p % 3; 
		// 	http.get('/api/wish', {
		// 		p: p
		// 	}); 
		// }

		// setInterval(ssss, 0); 
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

			http.post('/api/music', {
				hash: hash
			}).then(res => {
				let music = res.data; 
				this.music   =  music; 
				this.showMp3 =  true; 
			})
		}
	},
	computed: {
		bigSizeCover(){
			let cover = this.music.cover;

			if (cover) return cover.replace('{size}', '400'); 
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
