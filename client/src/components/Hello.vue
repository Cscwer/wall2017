<template>
	<div class="hello">
		<img :src="user.headimgurl" class="avatar" />
		<p class="name">{{ user.nickname }}</p>

		<footer>Night's Watch</footer>
	</div>
</template>

<script>
import wait from '@/utils/wait'; 
import http from '@/utils/http.client'; 


export default {
	name: 'hello',
	data() {
		return {
			user: {}
		}
	},
	created(){
		// Call Async Function 
		this.initAll(); 
	},
	methods: {
		initAll: async function(){
			let res = await this.getUser(); 

			this.user = res.data;
		},
		getUser: function(){
			return http.get('/api/user/me');
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar {
	width: 10em; 
	height: 10em; 
	border-radius: 10em; 
}

.name {
	margin: 1em; 
	font-size: 140%; 
}

footer {
	position: fixed;
	bottom: 2em; 
	left: 0;
	width: 100%; 
	color: #BBB; 
}
</style>
