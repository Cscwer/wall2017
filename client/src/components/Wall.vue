<template id="home">
	<div class="hello">
		<vue-data-loading
			:loading="loading"
			:completed="finish"
			:listens="['pull-down', 'infinite-scroll']"
			:offset="20"
			@infinite-scroll="loadMore"
			@pull-down="reload">

			<div slot="pull-down-ready">松开下拉</div>
			<div slot="pull-down-before">下拉以刷新</div>
			<div slot="infinite-scroll-loading" class="some-style-you-like">刷新中</div>

			<div @click.stop="toSearch" class="search-container">
				<img class="search" src="../assets/home/search.png">
				<span class="ps-text">搜索</span>
			</div>

			<div class="bottom-of-search-container" ref="bottomOfSearchContainer"></div>

			<swiper class="gw-swiper" :options="swiperOption" ref="mySwiper">
			<!-- slides -->
				<swiper-slide class="slider-img" v-for="(banner, idx) in banners" :key="idx">
					<img :src="banner.img" @click.stop="clickBanner(banner)">
				</swiper-slide>
			</swiper>

			<div class="wish-container">
				<!-- <transition-group name="wish-load" tag="div" > -->
					<wish @toastOnWall="sendToast" @deleteOnWall="deleteWish" class="wish-on-wall" v-for="(wish, idx) in list"
						:myInfo="user" :wish="wish" :status="0" :key="idx">
					</wish>
				<!-- </transition-group> -->
			</div>
		</vue-data-loading>

		<div class="bg-cover"></div>
	</div>
</template>

<script>
import wait from '@/utils/wait';
import http from '@/utils/http.client';
import ui from '@/utils/ui';
import Wish from './SingleWish';
import WishSearch from './WishSearch';
// import VueDataLoading from 'vue-data-loading'
// import banner from '../assets/home/slider.jpg';

let banners = [
	{
		img: 'https://io.chenpt.cc/banner/music-2.png',
		path: '/music'
	},
	{
		img: 'https://io.chenpt.cc/banner/HAPPY-GIRLS-DAY-2.png',
		path: null
	},
	{
		img: 'https://io.chenpt.cc/banner/love-2.png',
		path: '/love'
	},
	{
		// img: 'https://io.chenpt.cc/banner/reverse-2.png',
		img: 'https://io.chenpt.cc/banner/reverse-3.jpg', 
		path: null
	}
];

export default {
	name: 'hello',
	components: {
		'wish': Wish
	},
	data() {
		return {
			banners: banners,
			swiperOption: {
				autoplay: 3000,
				initialSlide: 1,
				freeMode: false,
				slidesPerView : 1.25,
				loop: true,
				// spaceBetween: 16,
				effect: 'coverflow',
				// direction: 'centered-auto',
				centeredSlides: true,
				pagination: '.swiper-pagination'
			},
			user: {},
			list: [],
			p: 0,
			loading: false,
			finish: false,
			alert: null
		}
	},
	created(){
		// Call Async Function
		this.initAll();

		// window.$$$ = this;
		this.loadMore();
	},
	methods: {
		initSearchPos(){
			setTimeout(() => {
				this.$refs.bottomOfSearchContainer.scrollIntoView();
			}, 300)
		},
		clickBanner(b){
			console.log('!')
			var path = b.path;

			if (path){
				this.$router.push({
					path: path
				})
			}
		},
		sendModal(){
			let myModal = this.$popup.push({
				type: 'modal',
				component: {
					template: `<h1 @click="close" style="font-size: 48px;">点击此处关闭 modal</h1>`,
					methods: {
						close(){
							this.$emit('close');
						}
					}
				}
			});
			myModal.launch();
		},
		toSearch() {
			let ins = this.$popup.push({
				type: 'modal',
				component: WishSearch
			});

			ins.launch();
		},
		sendToast(msg){
			this.$popup.toast({
				msg: msg,
				align: true,
				position: 'bottom'
			})
		},
		deleteWish(msg){
			console.log(msg + '   delete');
			let idx = null;
			this.list.forEach((e, innerIdx) => {
				if (e._id === msg) idx = innerIdx;
			});
			this.list.splice(idx, 1);
		},
		present(type){
			this.$popup.push({
				type: type,
				confirmText: '确定',
				cancelText: '否定',
				needBlur: true,
				handle: {
					confirm(e){
						console.log('yes', this);
						console.log('参数', e);
					},
					cancel(){
						console.log('no')
						this.close();
					}
				}
			}).launch()
		},
		initAll: async function(){
			let res = await http.get('/api/user/me', ui.showLoading());
			this.user = res.data;

			// this.initSearchPos();
		},
		getUser: function(){
			return http.get('/api/user/me');
		},
		loadMore: function(){
			if (this.loading) return;

			let p = this.p;
			this.loading = true;

			return http.get('/api/wish', {
				p: p
			}).then(rps => {
				this.p = p + 1;
				this.list = this.list.concat(rps.data);
				if (rps.code === 2001){
					console.log(p + ' : end!!');
					this.finish = true;
				} else {
					console.log(p + ' : not end');
				}

				this.loading = false;
			})
		},
		reload(){
			this.p = 0;
			this.loading = true;
			this.finish = false;

			http.get('/api/wish', {
				p: 0
			}).then(res => {
				this.p = this.p + 1;
				this.list = res.data;

				if (res.code === 2001){
					this.finish = true;
				} else {
				}

				this.loading = false;
			})

		}
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
	width: 100%;
	height: 100%;
	padding-top: 1px;
	background-color: rgb(255, 241, 241);
}

.search-container {
	width: 100%;
	padding: 8px 0;
	margin-top: 14px;
	border: 0;
	color: #f6b4c5;
	font-size: 16px;
	background-color: #fff;
}

.search {
	margin-left: 5%;
	margin-right: 2px;
	width: 20px;
	height: 20px;
	vertical-align: middle;
}

.gw-swiper {
	margin: 14px 0;
}

.ps-search {
	vertical-align: middle;
}

.wish-on-wall {
	margin: 14px auto;
	width: 93%;
}

.present {
	padding: .5em;
	margin: .5em;
	display: block;
	width: 90%;
	font-size: 18px;
	padding: .6em 0;
	border-radius: 4px;
	margin: 1em auto;
	background-color: rgb(240, 120, 50);
	color: #FFF;
	border: none;
	-webkit-appearance: none;
}

.slider-img img {
	display: block;
	width: 100%;
	border-radius: 10px;
	margin: 0 auto;
}

.bg-cover {
	position: fixed;
	left: 0;
	top: 0;
	z-index: -100;
	width: 100%;
	height: 100%;
	background-color: rgb(255, 241, 241);
}

.wish-load-enter-active, .wish-load-leave-active {
	transition: all .3s;
	/*transition-delay: .6s; */
}
.wish-load-enter, .wish-load-leave-to {
	transform: translateY(100%);
	opacity: 0;
}

</style>
