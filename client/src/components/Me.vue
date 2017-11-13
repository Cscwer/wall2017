<template>
	<div v-if="!isLoading">
		<div class="header-wrap">
			<div class="msg-icon-wrap" @click="isMyself ? openMsg() : leaveMsg(), hasMsg=false">
				<img src="../assets/me/msg-icon.png" alt="" class="msg-icon">
				<span class="red-dot" v-if="hasMsg"></span>
			</div>
			<div class="userinfo-wrap">
				<img :src="user.headimgurl" class="avatar" />
				<div class="name-wrap">
					<img src="../assets/me/female.png" alt="" class="sex-img" v-if="isFemale">
					<img src="../assets/me/male.png" alt="" class="sex-img" v-else>
					<p class="user-nickname">{{user.nickname}}</p>
					<img src="../assets/me/edit.png" alt="" class="edit-img" @click="editInfo" v-if="isMyself">
				</div>
				<p class="user-from">{{area}}校区</p>
			</div>
			<ul class="metab-wrap" v-if="isMyself">
				<li class="me-tab" :class="{active: activeidx === 0}"
					:style="{width:(isFemale ? 33 : 50) +'%'}"
					v-show="isFemale"
					@click="changeTo(0)">待领取</li>
				<li class="me-tab" :class="{active: activeidx === 1}"
					:style="{width:(isFemale ? 33 : 50) +'%'}"
					@click="changeTo(1)">实现中</li>
				<li class="me-tab" :class="{active: activeidx === 2}"
					:style="{width:(isFemale ? 33 : 50) +'%'}"
					@click="changeTo(2)">已实现</li>
				<span class="me-tab-avtive" :style="{
					left: ( isFemale ? (33 * activeidx) : (50 * (activeidx - 1)) + 10 ) + '%',
					width: (isFemale ? 33 : 30) +'%'
				}"></span>
			</ul>
		</div>
		<swiper :options="swiperOption" ref="mySwiper" class="swiper-box" :not-next-tick="notNextTick">
			<swiper-slide class="swiper-item">
				<div class="wish-container">
					<wish @deleteOnWall="deleteWish" class="wish-on-wall" v-for="(wish, idx) in list0" :wish="wish" :myInfo="user" :status="0" :key="idx"></wish>
				</div>
				<div v-show="this.list0.length === 0" class="text">{{(isFemale ? text.female.unclaimed : '1')}}</div>
			</swiper-slide>
			<swiper-slide class="swiper-item">
				<div class="wish-container">
					<wish @deleteOnWall="deleteWish" class="wish-on-wall" v-for="(wish, idx) in list1" :wish="wish" :myInfo="user" :status="1" :key="idx"></wish>
				</div>
				<div v-show="this.list1.length === 0" class="text">{{isFemale ? text.female.realizing : text.male.realizing}}</div>
			</swiper-slide>
   		 	<swiper-slide class="swiper-item">
				<div class="wish-container">
					<wish class="wish-on-wall" v-for="(wish, idx) in list2" :wish="wish" :myInfo="user" :status="2" :key="idx"></wish>
				</div>
				<div v-show="this.list2.length === 0" class="text">{{isFemale ? text.female.realized : text.male.realized}}</div>
			</swiper-slide>
		</swiper>


		<div class="bg"></div>
	</div>
</template>

<script>
import wait from '@/utils/wait';
import http from '@/utils/http.client';
import vwx from '@/utils/vwx';
import ui from '@/utils/ui';
import { appCtrl } from '@/utils/app.status';
import Msg from './Msg';


export default {
	name: 'me',
	props: ['others'],
	data(){
		return {
			isLoading: true,
			localIds: [],
			show: '',
			user: {},
			me: {},
			activeidx: 1,
			hasMsg: false,
			notNextTick: true,
			resistanceRatio : 0.4,
			swiperOption: {
				// autoplay: 1000,
				initialSlide: 1,
				freeMode: false,
				loop: false,
				onTransitionStart: (swiper) => {
					console.log(this.isFemale);
					swiper.unlockSwipeToPrev();

					if(!this.isFemale && swiper.activeIndex === 1) {
						swiper.lockSwipeToPrev();
					}
					console.log(swiper.activeIndex);
					this.activeidx = swiper.activeIndex;
				},
				onTransitionEnd: (swiper) => {
					if(swiper.activeIndex === 0 && !this.isFemale) {
						swiper.slideTo(1);
					}
				}
			},
			list0: [],
			list1: [],
			list2: [],
			text: {
				'male': {
					realizing: '你还没有领取愿望哦,去领一个愿望吧！',
					realized: '你还没有实现女生愿望哦！'
				},
				'female': {
					unclaimed: '你还没有许愿哦，快去许个愿望吧！',
					realizing: '你的愿望还没有被领取哦！',
					realized: '你的愿望还没有实现哦！'
				}
			}
		}
	},
	computed: {
		isFemale: function() {
			return this.user && this.user.sex-1 === 1
		},
		swiper() {
			return this.$refs.mySwiper.swiper
		},
		area() {
			return ['大学城','东风路','龙洞','番禺'][this.user.area || 0];
		},
		isMyself() {
			return this.user._id === this.me._id;
		}
	},
	created(){
		http.get('./api/user/me', ui.showLoading()).then(res => {
			this.me = res.data;
		}).then(() => {
			if(this.others) {
				this.user = this.others;
			}
			else {
				this.user = this.me;
			}
		}).then(() => {
			this.listload();
			this.isLoading = false;
		})


	},
	methods: {
		listload() {
			console.log(this.user);
			console.log("page created");
			this.hasMsg = appCtrl.toObject().hasMsg;
			this.getWish(0);
			this.getWish(1);
			this.getWish(2);
			
			setTimeout(() => {
				// window.swiper = this.$refs.mySwiper;
				if (this.isFemale) this.swiper.unlockSwipeToPrev()
			})
		},
		// init: function(){
		// 	return http.get('./api/user/me').then(res => {
		// 		this.user = res.data;
		// 	})
		// },
		// getUserInfo: function(){
		// 	if(!this.others) {
		// 		return this.init();
		// 	}
		// 	else {
		// 		this.user = this.others;
		// 		return Promise.resolve(true)
		// 	}

		// },
		changeTo: function(idx) {
			console.log(idx);
			this.swiper.slideTo(idx, 500, true);
			this.activeidx = idx;
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
		},
		openMsg: function() {
			appCtrl.off("hasMsg");
			var msg = this.$popup.push({
				component: Msg,
				type: "modal"
			})

			msg.launch();
		},
		leaveMsg() {
			let getInput =  this.$popup.push({
				type: 'prompt',
				confirmText: '确认',
				placeholderText: '输入给ta的留言',
				handle: {
					confirm: function(input) {
						console.log(input); 
					}
				}
			})
			getInput.launch();
		},
		async getWish(status) {
			let res = await http.get('/api/wish/user', {
				status: status,
				_id: this.user._id,
				sex: this.user.sex
			})
			if(res.code === 2001) {
				if(status === 0) {
					this.list0 = res.data;
				}

				if(status === 1) {
					this.list1 = res.data;
				}

				if(status === 2) {
					this.list2 = res.data;
				}
			}

			console.log(res);
			console.log(this.list0);
		},
		deleteWish(msg){
			console.log(msg + 'delete');;
				this['list' + this.activeidx].forEach((e, innerIdx) => {
					if (e._id === msg) idx = innerIdx;
				});
				this['list' + this.activeidx].splice(idx, 1);
			let idx = null;

		},
		// loadMore: function(){
		// 	let p = this.p;
		// 	this.loading = true;

		// 	let rps = http.get('/api/wish/user', {
		// 		p: p,
		// 		status: this.activeidx
		// 	});

		// 	this.p = p + 1;
			
		// 	this['list' + this.activeidx] = this['list' + this.activeidx].concat(rps.data);

		// 	if (rps.code === 2001){
		// 		this.finish = true;
		// 		console.log(p + ' : end!!');
		// 	} else {
		// 		console.log(p + ' : not end');
		// 	}
		// 	this.loading = false;
		// 	console.log("hello world");
		// }
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
		/* border-bottom: 4px solid #fff; */
	}

	.me-tab-avtive {
		position: absolute;
		bottom: 0;
		width: 33%;
		height: 4px;
		background-color: #fff;
		transition: left 0.3s;
	}

	.msg-icon-wrap {
		position: relative;
		padding-top: 15px;
		margin-right: 20px;
		text-align: right;
	}

	.msg-icon {
		display: inline-block;
		width: 23px;
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
		height: 15px;
	}

	.edit-img {
		width: 14px;
		height: 14px;
	}

	.user-nickname {
		display: inline-block;
		padding-left: 9px;
		padding-right: 9px;
		font-size: 0.5rem;
		color: rgb(255, 255, 255);
	}

	.name-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
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

	.red-dot {
		display: block;
		position: absolute;
		width: 4.5px;
		height: 4.5px;
		border-radius: 50% 50%;
		background-color: #ff0000;
		right: -1.5px;
		top: 13.5px;

	}

	.text {
		margin-top: 25vh;
		text-align: center;
		width: 100%;
		color: rgba(248, 153, 138, 1);
    	font-size: 0.46rem;
	}


</style>
