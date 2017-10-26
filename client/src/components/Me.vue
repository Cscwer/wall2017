<template>
	<div>

		<div class="header-wrap">
			<div class="msg-icon-wrap">
				<img src="../assets/me/msg-icon.png" alt="" class="msg-icon">
			</div>
			<div class="userinfo-wrap">
				<img :src="user.headimgurl" class="avatar" />
				<div class="name-wrap">
					<img src="../assets/me/female.png" alt="" class="sex-img" v-if="isFemale">
					<img src="../assets/me/male.png" alt="" class="sex-img" v-else>
					<p class="user-nickname">{{user.nickname}}</p>
					<img src="../assets/me/edit.png" alt="" class="edit-img">
				</div>
				<p class="user-from">{{user.from}}大学城校区</p>
			</div>
			<ul class="metab-wrap">
				<li class="me-tab" data-id="receive" v-if="isFemale">待领取</li>
				<li class="me-tab" data-id="achieving">实现中</li>
				<li class="me-tab" data-id="achieved">已实现</a></li>
			</ul>
		</div>
		<swiper :options="swiperOption" class="swiper-box"></swiper>

	</div>
</template>

<script>
import wait from '@/utils/wait'; 
import http from '@/utils/http.client'; 
import vwx from '@/utils/vwx'; 
		

export default {
	name: 'me', 
	data(){
		return {
			localIds: [], 
			show: '',
			user: {},
			sex: 'female',
			swiperOption: {
				// autoplay: 300,
				initialSlide: 1,
				paginationClickable: true,
				freeMode: false,
				slidesPerView : 1.25,
				loop: true,
				centeredSlides: true,
				pagination: '.swiper-pagination',
				scrollbar:'.swiper-scrollbar',
				scrollbarHide:false,
			}
		}
	}, 
	computed: {
		isFemale: function() {
			return this.user.sex === 0
		}
	},
	created(){
		this.init();
		console.log("page created");
		vwx.getAnImg().then(res => {
			alert('start'); 
			let img = res.data; 
			// console.log(img);
			console.log(JSON.stringify(res)); 

			this.show = img.url; 
		});
	},
	methods: {
		init: async function(){
			let res = await http.get('./api/user/me');
			this.user = res.data;
			console.log("init ok");
		},
		getUserInfo: function(){
			return http.get('./api/user/me')
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header-wrap {
		position: relative;
		min-height: 250px;
		background-image: url("../assets/me/bg-img.png");
		background-color: rgba(240,240,240,.5);
	}

	.metab-wrap {
		position: absolute;
		bottom: 0;
	}

	.me-tab {
		display: inline-block;
	}

	.msg-icon-wrap {
		padding-top: 15px;
		padding-right: 20px;
		text-align: right;
	}

	.msg-icon {
		display: inline-block;
		width: 26px;
		height: 26px;
	}

	.userinfo-wrap {
		text-align: center;
	}

	.avatar {
		width: 6.2em;
		height: 6.2em;
		border: 1px solid rgba(200,200,200,.5);
		border-radius: 25px;
	}

	.sex-img {
		display: inline-block;
		height: 18px;
	}

	.edit-img {
		display: inline-block;
		width: 15px;
	}

	.user-nickname {
		display: inline-block;
		padding-left: 3px;
		padding-right: 5px;
		font-size: 0.5rem;
		color: rgb(255, 255, 255);
	}

	.name-wrap {
		padding-top: 6px;
	}

	.user-from {
		padding-top: 2px;
		color: #fff;
	}

	.swiper-box {
		width: 100%;
		height: 100%;
	}

	
</style>
