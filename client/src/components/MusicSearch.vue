<template>
	<div class="new-music">
		<input type="text" v-model="keyword" @keyup="toSearch" class="new-music-search" placeholder="秋日早晨">

		<div class="result-list" v-if="listActive">
			<div class="on-searching" v-if="onSearching">拼命寻找中 ...</div>
			<div class="no-music" v-if="list.length === 0 && !onSearching && keyword !== ''">
				找不到 {{ keyword }} 相关的歌曲
			</div>

			<div v-else class="music-result" v-for="(music, idx) in list" @click="output_music(music)"> 
				<p class="music-songname">{{ music.songname }}</p>
				<p class="music-singername">{{ music.singername }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import wait from '@/utils/wait'; 
import http from '@/utils/http.client'; 
// import ui   from '@/utils/ui'; 

let timer = null; 

export default {
	name: 'music-search',
	props: [],
	data() {
		return {
			keyword: '',
			listActive: false,
			onSearching: false,
			list: []
		}
	},
	created(){
		// this.toSelect(); 

		// this.updateList('pop culture'); 
	},
	methods: {
		close(){
			this.$emit('close'); 
		},
		toSearch(){
			if (this.keyword === '') return; 

			this.updateList(this.keyword);
		},
		updateList(keyword){
			this.onSearching = true; 
			this.listActive = true; 
			clearTimeout(timer); 

			timer = setTimeout(() => {
				this.fromKugou(keyword).then(suc => {
					this.onSearching = false; 
				});
			}, 1000); 
		},
		fromKugou(keyword){
			return http.musicSearch({
				keyword: keyword
			}).then(res => {
				this.list = res.data.info; 
			}); 
		},
		output_music(selected_music){
			this.$emit('finishSearch', selected_music)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-music {
	/*background-color: rgb(255, 241, 241);*/
	font-size: 16px;
}

.new-music-search {
	display: block;
	width: 100%; 
	padding: 1em; 
	border: none;
	box-sizing: border-box;
}

.result-list {
	padding: 1em; 
}

.music-result {
	margin-bottom: .8em; 
	padding-bottom: .8em; 

	border-bottom: 1px solid rgba(0, 0, 0, .05); 
}

.music-singername {
	color: rgb(151, 153, 154);
}

.music-songname {
	color: rgb(245, 124, 117);
}
</style>
