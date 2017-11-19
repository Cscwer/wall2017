<!-- loversList.vue -->

<template id="loversList">
	<ul class="list-container">
		<li v-for="person in list" class="single-list" @click.stop="chooseUser(person)">
			<img :src="person.headimgurl" class="avatar">
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
import ui from '@/utils/ui';
// import select from './loversList';

export default {
	name: 'loversList',
	props: ['input'],
	data() {
		return {
			lover: {},
			list: []
		}
	},
	created(){
		// this.input.keyword
		let loading = ui.showLoading();
		console.log(this.input.keyword + 'fff');

		http.get('/api/user', {
		    q: this.input.keyword
		}).then(res => {
			loading();
			if (res.code === 2000){
				var temp = res.data.concat(res.data).concat(res.data);
				temp = temp.concat(temp);
				temp = temp.concat(temp);
				temp = temp.concat(temp);
				temp = temp.concat(temp);
				temp = temp.concat(temp);

				this.list = temp;
			} else {
				this.$popup.toast({
					msg: `出错了, 请重试, 错误码: ${res.code}`,
					position: 'top'
				});
			}
		})
	},
	methods: {
		chooseUser(person){
			console.log('inner loverlist', person);
			this.$emit('finishChoose', person);
		}
	}
}
</script>

<style scoped>
.list-container {
	width: 100%;
	margin-bottom: 30px;
	max-height: 6rem;
	overflow-y: scroll;
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
	display: inline-block;
	font-size: 14px;
	max-width: 4.5rem;
	white-space: nowrap;
    text-overflow: ellipsis;
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
