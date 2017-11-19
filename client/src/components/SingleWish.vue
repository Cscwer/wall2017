<!-- SingleWish.vue -->

<template>
	<div class="wish-container" v-if="myInfo.sex == 2">
		<div class="user-info">
			<img :src="wish.she.headimgurl" class="avatar" @click="toMe"/>
			<span class="user-name">{{wish.she.nickname}}</span>
			<div class="area" v-bind:style="{ backgroundColor: bgcolor[wish.she.area] }">{{area[wish.she.area]}}</div>
			<img v-if="myInfo._id === wish.she._id && wish.status === 0" src="../assets/home/delete.png" class="delete" @click="deleteWish('确定')">
		</div>
		<div class="wish">
			{{ wish.text }}
			<div class="label-con" v-if="wish.img">
				<input type="radio" class="img-radio" name="preview-toggle" :id="wish._id">
				<label class="wish-img-con" :for="wish._id" v-bind:style="{ backgroundImage: 'url(' + wish.img + ')' }">
					<img :src="wish.img" class="img-detail">

					<input type="radio" class="preview-cancel" name="preview-toggle"></input>
				</label>
				<div class="placeholder"></div>
				<button v-if="indexPage !== 'wishDetail' && wish.status !== 0 && (wish.she._id === myInfo._id || wish.he && wish.he._id === myInfo._id)" class=" pickImg" @click="searchMore">查看详情</button>
			</div>
			<button v-if="!wish.img && indexPage !== 'wishDetail' && wish.status !== 0 && (wish.she._id === myInfo._id || wish.he && wish.he._id === myInfo._id)" class="pickWish" @click="searchMore">查看详情</button>
			</div>
		</div>
	</div>
	<div class="wish-container" v-else="myInfo.sex == 1">
		<div class="user-info">
			<img :src="wish.she.headimgurl" class="avatar" @click="toMe"/>
			<span class="user-name">{{wish.she.nickname}}</span>
			<div class="area" v-bind:style="{ backgroundColor: bgcolor[wish.she.area] }">{{area[wish.she.area]}}</div>
		</div>
		<div class="wish">
			{{ wish.text }}
			<div class="label-con" v-if="wish.img">
				<input type="radio" class="img-radio" name="preview-toggle" :id="wish._id">
				<label class="wish-img-con" :for="wish._id" v-bind:style="{ backgroundImage: 'url(' + wish.img + ')' }">
					<img :src="wish.img" class="img-detail">

					<input type="radio" class="preview-cancel" name="preview-toggle"></input>
				</label>
				<div class="placeholder"></div>
				<button class=" pickImg" @click="pickWish('确定领取该愿望')" v-if="wish.status === 0">领取愿望</button>
				<button v-else-if="wish.status !== 0 && indexPage !== 'wishDetail' && (wish.she._id === myInfo._id || wish.he && wish.he._id === myInfo._id)" class=" pickImg" @click="searchMore">查看详情</button>
			</div>
			<button v-if="wish.status === 0 && !wish.img" class="pickWish" @click="pickWish('确定领取该愿望')">领取愿望</button>
			<button v-else-if="wish.status !== 0 && indexPage !== 'wishDetail' && !wish.img && (wish.she._id === myInfo._id || wish.he && wish.he._id === myInfo._id)" class="pickWish" @click="searchMore">查看详情</button>
		</div>
	</div>
</template>

<script>
import wait from '@/utils/wait';
import http from '@/utils/http.client';
import me from './Me';
import detail from './WishDetail';

export default {
	name: 'SingleWish',
	props: ['wish', 'myInfo', 'status', 'indexPage'],
	data() {
		return {
			area: ['大学城', '东风路', '龙洞'],
			bgcolor: ['#b5d1ff', '#ffb9b5', '#ffe88d']
		}
	},
	created(){
		// console.log(this.wish);
		this.index = this.indexPage
		console.log(this.indexPage);
	},
	methods: {
		present(type, world) {
			return new Promise((res, rej) => {
				this.$popup.push({
					type: type,
					confirmText: world,
					cancelText: '否定',
					needBlur: true,
					handle: {
						confirm(){
							res();
							this.close();
						},
						cancel(){
							this.close();
						}
					},
					transitionName: 'alert'
				}).launch()
			})
		},
		deleteWish(world) {
			this.present('alert', world).then(() => {
				http.post('/api/wish/delete', {
					_id: this.wish._id
				}).then(res => {
					if(res.code === 2000) {
						this.$emit('toastOnWall', '成功删除该愿望');
						this.$emit('deleteOnWall', this.wish._id);
					}
				})
			})
		},
		pickWish(world) {
			this.present('confirm', world).then(() => {
				http.post('/api/wish/pull', {
					_id: this.wish._id
				}).then(res => {
					if(res.code === 2000) {
						this.$emit('toastOnWall', '领取成功，请到个人主页查看愿望详情哦~');
						this.$emit('deleteOnWall', this.wish._id);
					} else if(res.code === 4108) {
						this.$emit('toastOnWall', res.msg);
						this.$emit('deleteOnWall', this.wish._id);
					} else {
						this.$emit('toastOnWall', res.msg);
					}
				})
			})
		},
		searchMore() {
			let sex = this.myInfo.sex === 2 ? 'he' : 'she';
			var msg = this.$popup.push({
				component: detail,
				type: "modal",
				binding: {
					wish: this.wish,
					toShow: sex,
					enable: this.myInfo._id === this.wish.she._id ? true : false
				},
				bg: 'rgb(255, 241, 241)'
			})

			msg.launch();
		},
		toMe(){
			if(this.indexPage === 'me') return;
			var msg = this.$popup.push({
				component: me,
				type: "modal",
				binding: {
					others: this.wish.she,
					initialSlide: 0
				},
				bg: 'rgb(255, 241, 241)'

			})

			msg.launch();
		}
	}

}
</script>

<style scoped>
	.wish-container {
		position: relative;
		padding: 15px 10px;
		background-color: #fff;
		border-radius: 0 10px 10px 10px;
		box-shadow: 4px 4px 4px #ffc5c5;
		box-sizing: border-box;

		min-height: 120px;
	}

	.user-info {
		margin-bottom: 10px;
		height: 1rem;
		vertical-align: middle;
	}

	.avatar {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border-radius: .5rem;
		vertical-align: middle;
		background-size: 100%;
	}

	.user-name {
		display: inline-block;
		max-width: 4.5rem;
		white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
		margin-left: 8px;
		margin-right: 8px;
		font-size: 16px;
		vertical-align: middle;
	}

	.area {
		display: inline-block;
		padding-left: 10px;
		padding-right: 10px;
		text-align: center;
		min-width: 45px;
		height: 15px;
		color: #fff;
		font-size: 12px;
		line-height: 15px;
		border-radius: .2rem;
		background-color: #b5d1ff;
		vertical-align: middle;
	}

	.wish {
		color: #888;
		font-size: 14px;
		position: relative;
		line-height: 22px;
		word-break: break-all;
	}

	.pickWish {
		float: right;
		height: 22px;
		font-size: 14px;
		padding: 2px 10px;
		color: #fff;
		border: none;
		outline: none;
		border-radius: 11px;
		background-color: #f9d52c;
	}

	.wish:after {
		visibility: hidden;
		display: block;
		font-size: 0;
		content: ".";
		clear: both;
		height: 0;
	}

	.delete {
		float: right;
		margin-top: .1rem;
		height: .8rem;
		width: .8rem;
		vertical-align: middle;
	}

	.label-con {
		width: 100%;
	}

	.wish-img-con {
		position: relative;
		display: inline-block;
	   	width: 100px;
		min-height: 100px;
		/*background-size: 100% auto;*/
		/* Size Should Be Cover */
		background-size: cover;
		background-position: center;
		border-radius: 10px;
		background-repeat: no-repeat;
		vertical-align: bottom;
	}

	.pickImg {
		/*float: right;*/
		position: absolute;
		right: 0;
		bottom: 0px;
		height: 22px;
		font-size: 14px;
		padding: 0 10px;
		color: #fff;
		border: none;
		outline: none;
		border-radius: 11px;
		background-color: #f9d52c;
		vertical-align: bottom;
	}

	.img-radio {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 0;
		height: 0;
		opacity: 0;
	}

	.img-detail {
		display: none;
		width: 100%;
	}

	.img-radio:checked + label {
		width: 100%;
		/*padding-top: 100%;*/
		background-image: none;
		/*display: none;*/
		/*min-height: 100px;*/
	}

	.img-radio:checked + label .img-detail {
		display: block;
	}

	.preview-cancel {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: none;
		opacity: 0;
	}

	.img-radio:checked + label .preview-cancel {
		display: block;
	}

	.placeholder {
		display: none;
		visibility: hidden;
		font-size: 0px;
		height: 0;
		content: ".";
		clear: both;
	}

	.img-radio:checked ~ .placeholder {
		display: block;
		height: 30px;
		background-color: #000;
	}
</style>
