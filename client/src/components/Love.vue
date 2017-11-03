<template id="love">

	<div class="main-container">
		<div class="title">
			<img src="../assets/love/title.png">
		</div>
		<div class="middle-container"  v-if="state == 1">
			<img v-if="me.sex == 2" class="waiting-img" src="../assets/love/boys-waiting.png">
			<img v-else class="waiting-img" src="../assets/love/girls-waiting.png">
			<img class="just-wait" src="../assets/love/wait.png">
			<img class="practicing" src="../assets/love/practice.png">
			<img class="points" src="../assets/love/points.png">
		</div>

		<div class="middle-container" v-else-if="state == 2">
			<img class="waiting-img" src="../assets/love/together.png">
			<img class="just-wait success" src="../assets/love/success.png">
			<img class="practicing love-dog" src="../assets/love/love-dog.png">
			<img class="points" src="../assets/love/points.png">
		</div>

		<div class="middle-container" v-else>
			<div class="avatar-container">
				<div class="personal-avatar my-avatar">
					<img class="avatar" :src="me.headimgurl">
					<p class="name my-name">{{me.nickname}}</p>
				</div>
				<div class="personal-avatar ta-avatar" v-on:click="pichLover">
					<img class="avatar" :src="ta.headimgurl">
					<p class="name ta-name">{{ ta.nickname }}</p>
				</div>
			</div>
			<img class="phone" src="../assets/love/call.png">
			<button class="confirm" v-bind:class="{ 'confirming': confirming }">确认匹配</button>
		</div>
		<div class="bg-cover"></div>
	</div>


</template>

<script>
import ui from '@/utils/ui';
import wait from '@/utils/wait';
import http from '@/utils/http.client';

// Load Img In Base64 With Webpack
import question_img from '../assets/love/question.png'; 

export default {
	name: 'love',
	props: ['chooseLover'],
	data() {
		return {
			me: {
				sex: 2,
				nickname: '加载中', 
				headimgurl: question_img
			},
			ta: {
	            _id: null,
	            openid: null,
	            nickname: "点击选择 TA",
	            headimgurl: question_img
	        },
			lover: {
				nickname: '233'
			},
			state: 0,
			confirming: true
		}
	},
	created(){
		http.get('/api/user/me', ui.showLoading()).then(res => {
			if (res.code === 2000){
				this.me = res.data; 
			} else {
				this.$popup.toast({
					msg: `出错啦, 请重试, 错误码 ${res.code}`,
					position: 'bottom'
				}); 
			}
		}); 
	},
	methods: {
		pichLover: function(value) {
			console.log('click');
			console.log(this.lover.nickname);
			let lover = this.lover.nickname;
			ui.chooseLover().then(person => {
				console.log('on love.vue after choosePerson', person); 
				// 设置 ta 
				this.ta = person; 
			});
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

	html, body, #love {
		width: 100%;
		height: 100%;
	}

	.main-container {
		width: 100%;
		background-color: rgb(255, 241, 241);
	}

	.title {
		margin: 0 auto;
		margin-top: 1.2rem;
		text-align: center;
	}

	.title img {
		width: 4rem;
	}

	.middle-container {
		width: 90%;
		margin: 0 auto;
		margin-top: .7rem;
		text-align: center;
		border-radius: 10px;
		background-color: #fff;
		box-shadow: 3px 3px 3px #ffc5c5;
	}

	.waiting-img {
		margin-top: 1rem;
		width: 70%;
	}

	.just-wait {
		display: block;
		margin: 1rem auto 0 auto;
		width: 3rem;
	}

	.success {
		width: 	5rem;
		margin-top: .7rem;
	}

	.practicing {
		display: block;
		margin: 0 auto;
		width: 2rem;
	}

	.love-dog {
		width: 3rem;
	}

	.points {
		width: 3.5rem;
		margin-bottom: 30px;
	}

	.avatar-container {
		padding-top: 1.2rem;
		position: relative;
		font-size: 0 !important;
	}

	.personal-avatar {
		display: inline-block;
		width: 43%;
		text-align: center;
	}

	.avatar {
		width: 2rem;
		height: 2rem;
		border-radius: 15px;
	}

	.name {
		color: #727272;
		font-size: 14px;
		margin-top: 10px;
	}

	.phone {
		width: 70%;
		margin-top: -1rem;
	}

	.confirm {
		margin: 1rem auto;
		width: 4.5rem;
		height: 1.2rem;
		border: 0;
		font-size: 18px;
		background-color: #dad9d9;
		color: #fff;
		outline: 0;
		border-radius: .6rem;
		letter-spacing: 2px;
	}

	.confirming {
		background-color: #ff7777;
		box-shadow: 0 0 10px #ff7777;
	}

	.bg-cover {
		position: fixed;
		left: 0;
		top: 0;
		z-index: -100;
		width: 100%;
		height: 100%;
		background-color: rgb(255, 241, 241);
	}
</style>
