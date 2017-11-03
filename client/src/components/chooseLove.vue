<!-- choose.vue -->

<template>
	<div class="main-container">
		<img src="../assets/love/bread.png" class="bread">
		<input @keyup.enter="search()" type="text" name="lover" class="input" placeholder="输入ta的微信名" v-model="input.lover">
	</div>
</template>

<script>
import wait from '@/utils/wait';
import http from '@/utils/http.client';
// import select from './loversList';

export default {
	name: 'ChooseLove',
	props: ['input'], 
	data() {
		return {}
	},
	methods: {
		search: function() {
			this.input.lover = this.input.lover.trim();
			console.log('search');
			console.log(this.input.lover + '   ChooseLove');
			this.$emit('click', this.input.lover);
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
