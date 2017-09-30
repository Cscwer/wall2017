<template>
	<div v-infinite-scroll="loadMore"
		infinite-scroll-disabled="loading" 
		infinite-scroll-distance="20" 
		class="hello">
		<img :src="user.headimgurl" class="avatar" />
		<p class="name">{{ user.nickname }} {{ user.sex }}</p>

		<div class="test">
			<input v-model="wish.text" type="text" />
		</div>

		<button @click="postWish">发送</button>

		<div>
			{{ wish.text }}
		</div>

		<ul>
			<li v-for="wish in list">
				{{ wish.text }}
			</li>
		</ul>

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
			user: {}, 
			wish: {
				text: ''
			},
			list: [], 
			p: 0,
			loading: false,
			finish: false
		}
	},
	created(){
		// Call Async Function 
		this.initAll(); 

	},
	methods: {
		initAll: async function(){
			let res = await http.get('/api/user/me'); 

			// let list = await http.get('/api/wish'); 
			// this.list = list.data; 
			this.user = res.data;
		},
		getUser: function(){
			return http.get('/api/user/me');
		},
		postWish: function(){
			let o = JSON.parse(JSON.stringify(this.wish)); 
			
			http.post('/api/wish', o); 
		}, 
		loadMore: async function(e){
			let p = this.p; 

			this.loading = true; 

			let rps = await http.get('/api/wish', {
				p: p
			}); 

			this.p = p + 1; 

			this.list = this.list.concat(rps.data);

			if (rps.code === 2001){
				this.finish = true; 
			} else {
				this.loading = false; 
			}
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

h1 {
	font-size: 130%; 
}

.name {
	margin: 1em; 
	font-size: 140%; 
}
</style>
