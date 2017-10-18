<template>
	<div>
		<input type="text" v-model="wish.text" />

		<button @click="postWish">许愿</button>
	</div>
</template>

<script>
import wait from '@/utils/wait'; 
import http from '@/utils/http.client'; 
// import ws from '@/utils/ws.client'; 


export default {
	name: 'wish', 
	data: function(){
		return {
			me: {}, 
			content: '', 
			her_id: '',
			msgs: [],
			wish: {
				text: ''
			}
		}
	},
	created(){
		// ws.ready.then(info => {
		// 	console.log('login info', info); 
		// 	this.me = info.user; 
		// })
		// ws.socket.on('revMsg', msg => this.revMsg(msg))
		// ws.socket.emit('join-danmaku', '??'); 
		// ws.socket.on('shot', function(msg){
		// 	console.log('!!', msg); 
		// }); 
		// ws.socket.emit('shot', 'fuck you'); 

		// http.get('/api/user/wish', {
		// 	p: 0, 
		// 	_id: '59ce826c4fece5203cd318c7',
		// 	status: 1
		// })

		// http.get('/api/wish', {
		// 	p: 0
		// }).then(res => {
		// 	console.log(JSON.stringify(res)) 
		// }); 
	},
	methods: {
		postWish(){
			let wish = this.wish;

			http.post('/api/wish', {
				text: wish.text
			})
		}
		// sendMsg(){
		// 	console.log('Send', this.content, 'to', this.her_id); 

		// 	ws.socket.emit('sendMsg', {
		// 		her_id: this.her_id,
		// 		content: this.content
		// 	}); 

			
		// },
		// revMsg(msg){
		// 	this.msgs.push(msg); 
		// }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
