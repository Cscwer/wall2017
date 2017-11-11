<template>
	<div class="post-wish">
		<textarea class="gw-prompt-textarea post-wish-line" v-model="wish.text" placeholder="输入你的愿望"></textarea>
		

		<div class="post-wish-picarea post-wish-line">
			<transition name="pic-load">
				<!-- <div v-if="wish.img" class="post-wish-img cus-loading" :style="{
					'background-image': 'url(' + wish.img + ')'
				}"></div> -->
				<div v-if="wish.img" class="post-wish-img cus-loading">
					<div class="post-wish-img" :style="{
						'background-image': 'url(' + wish.img + ')'
					}"></div>
				</div>
			</transition>

			<transition name="pic-load">
				<img v-if="!wish.img" @click.stop="chooseImg" class="post-wish-img" src="../assets/postwish/add.png"  />
			</transition>
		</div>

		<p class="post-wish-text post-wish-line">{{ innerText }}</p>

		<div class="post-wish-btns post-wish-line">
			<input id="postwish-haoshi" name="postwish-type" type="radio"
				hidden="hidden"v-model="wish.wishtype" :value="0" />
			<input id="postwish-shiwu" name="postwish-type" type="radio" 
				hidden="hidden" v-model="wish.wishtype" :value="1" />

			<label for="postwish-haoshi" class="post-wish-time post-wish-selector"
				:class="{ 'post-wish-time-active': wish.wishtype === 0 }"
				@click="innerText = '已选择耗时类'">
				耗时类
			</label>

			<label for="postwish-shiwu" class="post-wish-mass post-wish-selector"
				:class="{ 'post-wish-mass-active': wish.wishtype === 1 }"
				@click="innerText = '已选择实物类'">
				实物类
			</label>
		</div>
		<!-- {{ wish.wishtype }} -->
	</div>
</template>

<script>
import wait from '@/utils/wait'; 
import http from '@/utils/http.client'; 
import vwx from '@/utils/vwx'; 

export default {
	name: 'post-wish',
	props: ['wish'],
	data() {
		return {
			innerText: '确定你的愿望类型'
		}
	},
	created(){

	},
	methods: {
		chooseImg(){
			// this.wish.img = `https://io.chenpt.cc/girl-wall-image/a4cb40c6-e62d-448b-9dd3-6d6dfd4918ed`; 
			vwx.getAnImg().then(res => {
				// console.log(img); 
				// as test 
				// https://io.chenpt.cc/gw-init/album.jpg
				let file = res.data; 
				let url = file.url; 

				// this.wish.img = `https://io.chenpt.cc/gw-init/album.jpg`; 
				this.wish.img = url; 
			}); 
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

.post-wish-line {
	display: block;
	margin-bottom: 16px; 
}

.post-wish-text {
	text-align: center;
	font-size: 14px; 
	color: rgb(161, 161, 161);
}

.post-wish-img {
	width: 100px; 
	height: 100px; 
	border-radius: 10px;
	position: absolute;
	left: 0; 
	background-color: rgba(230, 230, 230, .1);
	background-size: cover;
	background-position: center;
}

.post-wish-picarea {
	position: relative;
	height: 100px; 
}

.post-wish-btns {
	font-size: 0; 
}

.post-wish-selector {
	font-size: 16px; 
	display: inline-block;
	width: 40%; 
	margin: 0 5%; 
	text-align: center;
	padding: .25em 0;
	border-radius: 6px; 
	/*color: #FFF; */
	box-sizing: border-box;
	transition: all .3s; 
}

.post-wish-time {
	color: rgb(144, 230, 255);
	border: 2px solid rgb(144, 230, 255);
	background-color: rgb(255, 255, 255);
	box-shadow: 0 4px 12px rgba(144, 230, 255, 0);
}

.post-wish-time-active {
	color: rgb(255, 255, 255); 
	background-color: rgb(144, 230, 255);
	box-shadow: 0 4px 12px rgba(144, 230, 255, .5);
}

.post-wish-mass {
	color: rgb(255, 153, 211);
	border: 2px solid rgb(255, 153, 211);
	background-color: rgb(255, 255, 255);
	box-shadow: 0 4px 12px rgba(255, 153, 211, 0);
}

.post-wish-mass-active {
	color: rgb(255, 255, 255); 
	background-color: rgb(255, 153, 211);
	box-shadow: 0 4px 12px rgba(255, 153, 211, .5);
}

.pic-load-enter-active, .pic-load-leave-active {
	transition: all .3s; 
	transform-origin: 50%; 
	transition-timing-function: cubic-bezier(0.74, 0, 0.36, 1.55);
}

.pic-load-enter, .pic-load-leave-to {
	transform: scale(1.5);
	opacity: 0; 
}

@keyframes cus-loading {
    100% {
        transform: rotate(360deg);
    }
}

.cus-loading::before {
	content: ""; 
	position: absolute;
	height: 50%;
	width: 50%;
	left: 25%; 
	top: 25%; 
	box-sizing: border-box;
	border-radius: 50%;
	border: 6px solid rgba(0, 0, 0, 0.1);
	border-top: 6px solid #555;
	animation: cus-loading 1.2s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

.post-img-choosen {
	position: absolute;
	left: 0; 
	top: 0; 
	width: 100%;
	height: 100%; 
}
</style>
