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
					<img src="../assets/me/edit.png" alt="" class="edit-img" @click="editInfo">
				</div>
				<p class="user-from">{{area}}校区</p>
			</div>
			<ul class="metab-wrap">
				<li class="me-tab" :class="{active: activeidx === 0}"  v-show="isFemale" @click="changeTo(0)">待领取</li>
				<li class="me-tab" :class="{active: activeidx === 1}"  @click="changeTo(1)">实现中</li>
				<li class="me-tab" :class="{active: activeidx === 2}"  @click="changeTo(2)">已实现</a></li>
			</ul>
		</div>
		<swiper :options="swiperOption" ref="mySwiper" class="swiper-box" >
    		<swiper-slide class="swiper-item tab1-content">
				<div class="wish-container">
					<wish class="wish-on-wall" v-for="(wish, idx) in list" :userData="wish.she" :key="idx" :userWish="wish.text"></wish>
				</div>
			</swiper-slide>
   		 	<swiper-slide class="swiper-item tab2-content">
				已实现
			</swiper-slide>
			<swiper-slide class="swiper-item">
				待领取
			</swiper-slide>
		</swiper>


		<div class="bg"></div>
	</div>
</template>

<script>
import wait from '@/utils/wait'; 
import http from '@/utils/http.client'; 
import vwx from '@/utils/vwx';
import Wish from './SingleWish';
import ui from '@/utils/ui';

export default {
	name: 'me', 
	components: {
		'wish': Wish
	},
	data(){
		return {
			localIds: [], 
			show: '',
			user: {},
			sex: 'female',
			activeidx: 1,
			swiperOption: {
				// autoplay: 1000,
				initialSlide: 0,
				paginationClickable: true,
				freeMode: false,
				loop: true,
				pagination: '.swiper-pagination',
			},
			list: [
				{
					"_id": "59da17d88d91aa39709248da",
					"she": {
						"_id": "59ce826c4fece5203cd318c7",
						"openid": "opdbdwdWXWMg9UY72Z4i_DTcblR0",
						"nickname": "fuck",
						"sex": 2,
						"headimgurl": "http://wx.qlogo.cn/mmopen/vi_32/sBlxQJd2SyVeyroibMblibJyoINHpLnfPwGDib8mNzfMibAsrdxeSOyYqOtYjrglx04mJ2TeM3Pr4juMKjpHJJFcZA/0",
						"__v": 0,
						"created_at": "2017-09-29T17:27:08.773Z",
						"phone": "未设置",
						"area": 0
					},
					"__v": 0,
					"created_at": "2017-10-08T12:19:36.653Z",
					"wishtype": 0,
					"status": 0,
					"text": "我的愿望是世界和平"
				},
			]
		}
	}, 
	computed: {
		isFemale: function() {
			return this.user.sex-1 === 0
		},
		swiper() {
			return this.$refs.mySwiper.swiper                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
		},
		area() {
			return ['大学城','东风路','龙洞','番禺'][this.user.area || 0];
		}
	},
	created(){
		this.init();
		console.log("page created");
	},
	methods: {
		init: async function(){
			let res = await http.get('./api/user/me');
			this.user = res.data;
			console.log("init ok");
		},
		getUserInfo: function(){
			return http.get('./api/user/me')
		},
		changeTo: function(idx) {
			this.activeidx = idx;
			this.swiper.slideTo(idx, 500, false);
			console.log(this.activeidx);

		},
		editInfo: function() {
			var toEdit = {
				nickname: this.user.nickname,
				area: this.user.area,
				weid: this.user.weid,
				phone: this.user.phone
			}
			ui.editUserInfo(toEdit).then(info => {
				console.log(info);
				this.user.nickname = info.nickname;
				this.user.area = info.area;
				this.user.weid = info.weid;
				this.user.phone = info.phone;
			});
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.wrap {
		height: 100%;
		
		
	}
	.bg {
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		position: fixed;
		z-index: -99; 
		background-color: rgb(255, 241, 241);
	}

	.wish-on-wall {
		margin: 14px auto;
		width: 93%;
	}

	.header-wrap {
		position: relative;
		min-height: 250px;
		background-image: url("../assets/me/bg-img.png");
		background-color: rgba(240,240,240,.5);
		box-shadow: 0px 10px 10px 0px rgba(254, 162, 140, .6);
	}

	.metab-wrap {
		width: 90%;
    	left: 5%;
		display: flex;
		justify-content: space-around;
		position: absolute;
		bottom: 0;
	}

	.me-tab {
		display: inline-block;
		color: #fff;
		text-align: center;
		width: 90px;
		padding-bottom: 15px;
		font-size: 16px;
	}

	.active {
		border-bottom: 4px solid #fff;
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

	.tab1-content, .tab2-content {
		width: 100%!important;
	}

	
</style>
