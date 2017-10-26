<template id="home">
	<!-- <div v-infinite-scroll="loadMore"
		infinite-scroll-disabled="loading"
		infinite-scroll-distance="20"
		class="hello"> -->
	<div class="hello">

		<div @click.stop="toSearch" class="search-container" :style="{ display: scrollDown ? block : none }">
			<img class="search" src="../assets/home/search.png">
			<span class="ps-text">搜索</span>
		</div>

		<swiper class="gw-swiper" :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
		<!-- slides -->
			<swiper-slide class="slider-img" v-for="banner in banners">
				<img :src="banner">
			</swiper-slide>
		</swiper>

		<div class="wish-container">
			<wish class="wish-on-wall" v-for="wish in list" :userData=wish.user :userWish=wish.wish></wish>
		</div>
	</div>
</template>

<script>
import wait from '@/utils/wait';
import http from '@/utils/http.client';
import ui from '@/utils/ui';
import Wish from './SingleWish';
import WishSearch from './WishSearch';
import banner from '../assets/home/slider.jpg';

export default {
	name: 'hello',
	components: {
		'wish': Wish
	},

	data() {
		return {
			toastText: '',
			toastType: 'top',
			banners: [ banner, banner, banner ],
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
			list: [
				{
					user: {
						name: '中国首穷',
						area: 1,
						headimgurl: '',
						sex: 2
					},
					wish: '我要上王者'
				},
				{
					user: {
						name: 'legilis',
						area: 2,
						headimgurl: '',
						sex: 2
					},
					wish: '我要上王者我，我沃尔夫见多识广覅ulUI我耳机不好 就回来维护费'
				},
				{
					user: {
						name: 'legilis',
						area: 0,
						headimgurl: '',
						sex: 2
					},
					wish: '我要上王者wekiuajsliofaksvgjxjlasieujlfksdzjushoduiflhajkdfnuaps;dlkjfkahdlfiasjdkfdnlfiwqe'
				},
				{
					user: {
						name: 'legilis',
						area: 1,
						headimgurl: '',
						sex: 2
					},
					wish: '这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。'
				}

			],
			p: 0,
			loading: false,
			finish: false,
			alert: null
		}
	},
	created(){
		// Call Async Function
		// this.initAll();
		// this.loadMore();
	},
	methods: {
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
		sendToast(){
			this.$popup.toast({
				msg: this.toastText,
				position: this.toastType,
			})
		},
		present(type){
			this.$popup.push({
				type: type,
				confirmText: '确定',
				cancelText: '否定',
				placeholderText: '输入给她的留言',
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
		// initAll: async function(){
		// 	let res = await http.get('/api/user/me');

		// 	this.user = res.data;
		// },
		// getUser: function(){
		// 	return http.get('/api/user/me');
		// },
		// loadMore: async function(){
		// 	let p = this.p;

		// 	this.loading = true;

		// 	let rps = await http.get('/api/wish', {
		// 		p: p
		// 	});

		// 	this.p = p + 1;

		// 	this.list = this.list.concat(rps.data);

		// 	if (rps.code === 2001){
		// 		this.finish = true;
		// 	} else {
		// 		// this.loading = false;
		// 	}
		// }
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

</style>
