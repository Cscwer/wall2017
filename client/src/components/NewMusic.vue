<template>
	<div class="new-music">
		<textarea class="gw-prompt-textarea" v-model="music.content" placeholder="说点什么把..."></textarea>

		<div class="selected">
			
			<div class="selected-music">
				<div class="album-img-container">
					<transition name="pic-load">
						<img v-if="!music_detail"  class="select-icon bottom-bg" @click="toSelect" src="../assets/music/select.png" />
					</transition>
					
					<transition name="pic-load">
						<img v-if="music_detail" class="select-icon bottom-bg" @click="toSelect" :src="bigSizeCover" />
					</transition>
					
					<img v-if="music_detail" class="cancel-select" @click="cancelSelect" src="../assets/music/cancel_select.png" />
				</div>

				<transition name="pic-load">
					<div class="music-info" v-if="music_detail">
						<p class="music-name">{{ music_detail.songName || '未知歌曲名' }}</p>
						<p class="music-author">{{ music_detail.singerName || '未知歌手' }}</p>
					</div>				
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import wait from '@/utils/wait'; 
import http from '@/utils/http.client'; 
import ui   from '@/utils/ui'; 

export default {
	name: 'new-music',
	props: ['music'],
	data() {
		return {
			// music_detail: {"fileHead":100,"q":0,"extra":{"320filesize":11623488,"sqfilesize":0,"sqhash":"","128hash":"795F55870CEA8E6F89C2BDD89A267D20","320hash":"103F27F1ABA6103D6B807615E7EFF5BB","128filesize":4649839},"fileSize":4649839,"hash":"795F55870CEA8E6F89C2BDD89A267D20","choricSinger":"坂上なち","error":"","topic_remark":"","imgUrl":"","url":"http://fs.open.kugou.com/13f34e310b900d83e332fd35ea5d9b9b/59e9f3a3/G042/M04/1B/05/CpQEAFYuLEWAWYZZAEbzb547Gtw225.mp3","time":1508504637,"bitRate":128,"songName":"asdjohasdjkashdgasjldghashdjasgdjgasgdgasdhgasjdggashjdjhasgdjghsdLast Remain","req_hash":"795F55870CEA8E6F89C2BDD89A267D20","singerHead":"","album_img":"http://imge.kugou.com/stdmusic/{size}/20151221/20151221224609984340.jpg","privilege":0,"status":1,"stype":11323,"singerId":192432,"singerName":"坂上なち","ctype":1009,"fileName":"坂上なち - Last Remain","topic_url":"","intro":"","mvhash":"","extName":"mp3","errcode":0,"timeLength":291}, 
			// target_music: {"pay_type_320":0,"m4afilesize":1188841,"price_sq":0,"filesize":4649839,"source":"","bitrate":128,"topic":"原曲：ラストリモート 東方地霊殿","price":0,"Accompany":0,"old_cpy":1,"fail_process_sq":0,"singername":"Alstroemeria Records","pay_type":0,"sourceid":0,"topic_url":"","rp_type":"audio","pkg_price":0,"feetype":0,"filename":"Alstroemeria Records - Last Remain【原曲：ラストリモート 東方地霊殿】","price_320":0,"extname":"mp3","320hash":"103f27f1aba6103d6b807615e7eff5bb","audio_id":19210681,"privilege":0,"album_audio_id":32599097,"sqfilesize":0,"album_id":"1009987","ownercount":4,"fail_process_320":0,"320privilege":0,"isnew":0,"320filesize":11623488,"rp_publish":1,"duration":290,"hash":"795f55870cea8e6f89c2bdd89a267d20","album_name":"POP   CULTURE 4","sqhash":"","songname":"Last Remain","fail_process":0,"srctype":1,"pkg_price_320":0,"pkg_price_sq":0,"pay_type_sq":0,"mvhash":"","sqprivilege":0,"group":[],"othername":""}
			music_detail: null, 
			target_music: null
		}
	},
	created(){
		if (this.music_detail) this.music.selected = this.music_detail; 
	},
	methods: {
		close(){
			this.$emit('close'); 
		},
		toSelect(){
			ui.openMusicSearch().then(target_music => {
				console.log(JSON.stringify(target_music))
				this.target_music = target_music; 

				this.findDetail(target_music.hash); 
			}); 
		}, 
		findDetail(hash){
			return http.musicDetail({
				hash: hash
			}).then(music_detail => {
				this.music_detail = music_detail; 
				this.music.selected = music_detail; 
			}); 
		},
		cancelSelect(){
			this.music_detail = null; 
		}
	},
	computed: {
		bigSizeCover(){
			let cover = this.music_detail.cover;
			let album_img = this.music_detail.album_img; 

			if (cover) return cover.replace('{size}', '400'); 
			else if (album_img) return album_img.replace('{size}', '400'); 
			else return 'NO_IMG'; 
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gw-prompt-textarea {
	width: 100%; 
	min-height: 5em;
	font-size: 14px; 
	border: none;
	resize: none;
	color: #555;
}

.select-icon {
	display: inline-block;
	vertical-align: middle;
	font-size: 0; 
	position: relative;
	width: 70px; 
	height: 70px;
	border: none;
	border-radius: 4px;
	background-color: rgb(238, 219, 219); 
}

.bottom-bg {
	position: absolute;
	left: 0;
	top: 0; 
	width: 100%;
	height: 100%; 
}

.selected {
	font-size: 0; 
	margin-bottom: 20px; 
	white-space: nowrap;
}

.selected-music {
	position: relative;
	margin-left: 70px; 
	height: 70px; 
}

.album-img-container {
	position: absolute;
	width: 70px;
	height: 70px;
	top: 0; 
	left: -70px;
}

.cancel-select {
	position: absolute;
	right: -15px; 
	top: -12px; 
	width: 20px;
	height: 20px; 
	padding: 5px 5px 10px 10px; 
}

.music-info {
	position: absolute;
	width: 90%; 
	left: 0px; 
	top: 50%; 
	transform: translateY(-50%);
	margin-left: 1.2em; 
	font-size: 14px; 
	overflow: hidden;
}

.music-author {
	color: rgb(125, 125, 125);
	text-overflow: ellipsis;
	width: 100%; 
	white-space: nowrap;
	overflow: hidden;
}

.music-name {
	color: rgb(255, 94, 94);
}

/* Animation Here */
.pic-load-enter-active, .pic-load-leave-active {
	transition: all .3s; 
	transition-timing-function: cubic-bezier(0.74, 0, 0.36, 1.55);
}

.pic-load-enter, .pic-load-leave-to {
	transform: scale(1.5);
	opacity: 0; 
}
</style>
