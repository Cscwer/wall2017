<!-- loversList.vue -->

<template id="loversList">
	<ul class="list-container">
		<li v-for="person in list" class="single-list">
			<img :src="person.avatar" class="avatar">
			<span class="nickname">{{person.nickname}}</span>
			<input type="radio" name="lover" class="checkbox" :value="person._id" :id="person._id" v-model="lover">
			<label class="check-con" :for="person._id">
				√
			</label>
		</li>
	</ul>
</template>

<script>
import wait from '@/utils/wait';
import http from '@/utils/http.client';
// import select from './loversList';

export default {
	name: 'loversList',
	data() {
		return {
			lover: {},
			list: [
				{
					avatar: 'http://wx.qlogo.cn/mmopen/vi_32/En0lnickzloWeTDzDEgib29ZKUZvrWIy2SqiaDVOBQcCEDPnmDWibpOd37Tul1WPicXpicwAEY3S2icQBnGAjm05MvIRQ/0',
					nickname: 'hhh',
					_id: 'jhgajhfjadsfjk1'
				},
				{
					avatar: 'http://wx.qlogo.cn/mmopen/vi_32/En0lnickzloWeTDzDEgib29ZKUZvrWIy2SqiaDVOBQcCEDPnmDWibpOd37Tul1WPicXpicwAEY3S2icQBnGAjm05MvIRQ/0',
					nickname: 'hhh',
					_id: 'jhgajhfjadsfjk2'
				},
				{
					avatar: 'http://wx.qlogo.cn/mmopen/vi_32/En0lnickzloWeTDzDEgib29ZKUZvrWIy2SqiaDVOBQcCEDPnmDWibpOd37Tul1WPicXpicwAEY3S2icQBnGAjm05MvIRQ/0',
					nickname: 'hhh',
					_id: 'jhgajhfjadsfjk3'
				},{
					avatar: 'http://wx.qlogo.cn/mmopen/vi_32/En0lnickzloWeTDzDEgib29ZKUZvrWIy2SqiaDVOBQcCEDPnmDWibpOd37Tul1WPicXpicwAEY3S2icQBnGAjm05MvIRQ/0',
					nickname: 'hhh',
					_id: 'jhgajhfjadsfjk4'
				}
			]
		}
	},
	methods: {

	}
}
</script>

<style scoped>
.list-container {
	width: 100%;
	margin-bottom: 30px;
}

.single-list {
	position: relative;
	margin: 15px auto;
	width: 85%;
	padding: 0;
	box-sizing: border-box;
}

.single-list:first-of-type {
	margin-top: 30px;
}

.avatar {
	margin-right: 5px;
	width: 38px;
	height: 38px;
	border-radius: 19px;
	vertical-align: middle;
}

.nickname {
	font-size: 14px;
	vertical-align: middle;
}

.check-con {
	position: absolute;
	margin-top: 10px;
	right: 10px;
	width: 16px;
	height: 16px;
	color: #fff;
	font-size: 12px;
	text-align: center;
	line-height: 16px;
	border-radius: 8px;
	display: inline-block;
	background-color: #e6e6e6;
}

.checkbox:checked + label {
	background-color: rgb(82, 255, 192);
}

.checkbox {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 38px;
	opacity: 0;
}

</style>
