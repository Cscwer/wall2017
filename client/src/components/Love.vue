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
			22
		</div>

		<div class="middle-container" v-else>

		</div>
	</div>


</template>

<script>
import wait from '@/utils/wait';
import http from '@/utils/http.client';

export default {
	name: 'love',
	data() {
		return {
			me: {
				sex: 2
			},
			lover: {
				name: '233'
			},
			state: 1
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
		padding-top: 1rem;
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

	.practicing {
		display: block;
		margin: 0 auto;
		width: 2rem;
	}

	.points {
		width: 3.5rem;
		margin-bottom: 30px;
	}
</style>
