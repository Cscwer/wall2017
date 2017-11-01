<!-- SingleWish.vue -->

<template>
	<div class="wish-container" v-if="me.sex == 2">
		<div class="user-info">
			<img :src="user.headimgurl" class="avatar" />
			<!-- <div class="avatar" ：style="{ backgroundImage: user.avatar }"></div> -->
			<!-- <div class="avatar" v-bind:style="{ backgroundImage: user.headimgurl }"></div> -->
			<span class="user-name">{{user.nickname}}</span>
			<div class="area" v-bind:style="{ backgroundColor: bgcolor[user.area] }">{{area[user.area]}}</div>
			<img v-if="me._id === user._id" src="../assets/home/delete.png" class="delete" @click="present('alert')">
		</div>
		<div class="wish">
			{{wishText}}
			<input type="radio" class="img-radio" name="preview-toggle" :id="wishId">
			<label v-if="user.headimgurl" class="wish-img-con" :for="wishId" v-bind:style="{ backgroundImage: 'url(' + user.headimgurl + ')' }">
				<img :src="user.headimgurl" class="img-detail">

				<input type="radio" class="preview-cancel" name="preview-toggle"></input>
			</label>
		</div>
	</div>
	<div class="wish-container" v-else="me.sex == 1">
		<div class="user-info">
			<!-- <img :src="user.headimgurl" class="avatar" /> -->
			<div class="avatar" v-bind:style="{ backgroundImage: user.headimgurl }"></div>
			<!-- <div class="avatar"></div> -->
			<span class="user-name">{{user.nickname}}</span>
			<div class="area" v-bind:style="{ backgroundColor: bgcolor[user.area] }">{{area[user.area]}}</div>
		</div>
		<div class="wish">
			{{wishText}}
			<input type="radio" class="img-radio" name="preview-toggle" :id="wishId">
			<label v-if="user.headimgurl" class="wish-img-con" :for="wishId" v-bind:style="{ backgroundImage: 'url(' + user.headimgurl + ')' }">
				<img :src="user.headimgurl" class="img-detail">

				<input type="radio" class="preview-cancel" name="preview-toggle"></input>
			</label>
			<button class="pickWish" @click="present('confirm')">领取愿望</button>
		</div>
	</div>
</template>

<script>
import wait from '@/utils/wait';
import http from '@/utils/http.client';

export default {
	name: 'SingleWish',
	props: ['wish', 'myInfo'],
	data() {
		return {
			me: this.myInfo,
			user: this.wish.she,
			wishText: this.wish.text,
			img: this.wish.img,
			area: ['大学城', '东风路', '龙洞'],
			bgcolor: ['#b5d1ff', '#ffb9b5', '#ffe88d']
		}
	},
	created(){
		// console.log(this.user);
	},
	methods: {
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

	.wish-img-con {
		display: block;
	   	width: 100px;
		min-height: 100px;
		background-size: 100% auto;
		background-position: center;
		position: relative;
		/*background-repeat: no-repeat;*/
	}

	.img-radio {
		position: absolute;
		left: 0;
		bottom: 0;
		/*width: 0;
		height: 0;*/
		/*opacity: 0;*/
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
</style>
