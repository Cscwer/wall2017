<!-- SingleWish.vue -->

<template>
	<div class="wish-container" v-if="me.sex == 2">
		<div class="user-info">
			<!-- <img :src="user.headimgurl" class="avatar" /> -->
			<div class="avatar"></div>
			<span class="user-name">{{user.name}}</span>
			<div class="area" v-bind:style="{ backgroundColor: bgcolor[user.area] }">{{area[user.area]}}</div>
			<img v-if="me.id === user.name" src="../assets/home/delete.png" class="delete" @click="present('alert')">
		</div>
		<div class="wish">
			{{wish}}
		</div>
	</div>
	<div class="wish-container" v-else="me.sex == 1">
		<div class="user-info">
			<!-- <img :src="user.headimgurl" class="avatar" /> -->
			<div class="avatar"></div>
			<span class="user-name">{{user.name}}</span>
			<div class="area" v-bind:style="{ backgroundColor: bgcolor[user.area] }">{{area[user.area]}}</div>
		</div>
		<div class="wish">
			{{wish}}
		</div>
		<button class="pickWish" @click="present('confirm')">领取愿望</button>
	</div>
</template>

<script>
import wait from '@/utils/wait';
import http from '@/utils/http.client';

export default {
	name: 'SingleWish',
	props: ['userData', 'userWish'],
	data() {
		return {
			me: {
				sex: 1,
				id: '中国首穷'
			},
			user: this.userData,
			wish: this.userWish,
			area: ['大学城', '东风路', '龙洞'],
			bgcolor: ['#b5d1ff', '#ffb9b5', '#ffe88d']
		}
	},
	methods: {
		getUser: function() {
			return http.get('/api/user/me');
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
		background-color: #000;
		border-radius: .5rem;
		vertical-align: middle;
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
		width: 1rem;
		height: 15px;
		color: #fff;
		font-size: 12px;
		line-height: 15px;
		border-radius: .2rem;
		background-color: #b5d1ff;
		vertical-align: middle;
	}

	.wish {
		/*float: left;*/
		color: #888;
		word-break: break-all;
		font-size: 14px;
	}

	.delete {
		float: right;
		margin-top: .1rem;
		height: .8rem;
		width: .8rem;
		vertical-align: middle;
	}

	.pickWish {
		position: absolute;
		bottom: 5px;
		right: 10px;
		height: 22px;
		font-size: 14px;
		padding: 2px 10px;
		color: #fff;
		border: none;
		outline: none;
		border-radius: 11px;
		background-color: #f9d52c;
	}
</style>
