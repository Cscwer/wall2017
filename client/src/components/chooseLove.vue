<!-- choose.vue -->

<template>
	<div class="main-container">
		<img src="../assets/love/bread.png" class="bread">
		<input @keyup.enter="search()" type="text" name="lover" class="input" placeholder="输入ta的微信名" v-model="lover">
	</div>
</template>

<script>
import wait from '@/utils/wait';
import http from '@/utils/http.client';
// import select from './loversList';

export default {
	name: 'ChooseLove',
	data() {
		return {
			lover: ''
		}
	},
	methods: {
		search: function() {
			console.log('search');
			console.log(this.lover + '   ChooseLove');
			this.$emit('pick', this.lover);
			// let myModal = this.$popup.push({
			// 	type: 'confirm',
			// 	confirmText: '确定',
			// 	needBlur: true,
			// 	component: select
			// });
			// myModal.launch();
		}
	}
}
</script>

<style scoped>
.main-container {
	width: 100%;
	text-align: center;
}

.bread {
	width: 70%;
}

.input {
	width: 90%;
	margin: .6rem auto .7rem auto;
	height: 1rem;
	font-size: 16px;
	line-height: 1rem;
	text-align: center;
	border-radius: .5rem;
	border: solid #fff7f7 2px;
	box-shadow: 0 0 10px #fff7f7;
	outline: 0;
}

</style>
