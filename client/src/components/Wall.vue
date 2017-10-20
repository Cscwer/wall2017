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
		

		<h1>弹出层</h1>
		<button class="present" @click="present('alert')">alert</button>
		<button class="present" @click="present('confirm')">confirm</button>
		<button class="present" @click="present('prompt')">prompt</button>
		
		<h1>吐司</h1>
		<input type="text" placeholder="输入提示内容" v-model="toastText" />
	

		<label for="top">顶部</label>
		<input type="radio" id="top" value="top" checked v-model="toastType">
		
		<label for="bottom">底部</label>
		<input type="radio" id="bottom" value="bottom" v-model="toastType">
		
		<button class="present" style="display: block;" @click="sendToast">发射</button>
		
		<h1>弹出modal</h1>
		<button class="present" style="display: block;" @click="sendModal">发射</button>
		
		<h1>编辑个人资料</h1>
		<button class="present" style="display: block;" @click="editMyself">开始编辑</button>

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
import ui from '@/utils/ui'; 




export default {
	name: 'hello',
	data() {
		return {
			toastText: '',
			toastType: 'top',
			user: {}, 
			wish: {
				text: ''
			},
			list: [], 
			p: 0,
			loading: false,
			finish: false,

			alert: null
		}
	},
	created(){
		// Call Async Function 
		this.initAll(); 
		// this.loadMore(); 

		this.$popup.toast({
			msg: '0v0', 
			position: 'top',
			cancelable: true,
			align: true,
			duration: 8000
		})


		// let toEdit = {
		// 	nickname: '',
		// 	area: '',
		// 	weid: '',
		// 	phone: ''
		// }
		// this.$popup.push({
		// 	type: 'prompt', 
		// 	confirmText: '保存', 
		// 	component: MyInfo,
		// 	binding: {
		// 		toEdit: toEdit
		// 	},
		// 	handle: {
		// 		confirm(e){
		// 			console.log(toEdit)
		// 			this.close(); 
		// 		}
		// 	}
		// }).launch(); 

		

	},
	methods: {
		editMyself(){
			ui.editUserInfo().then(res => {
				console.log('编辑成功', res); 
			}, cancel => {
				console.log('用户取消编辑个人资料'); 
			})
		},
		sendModal(){
			let myModal = this.$popup.push({
				type: 'modal', 
				component: {
					template: `<h1 @click="close" style="font-size: 48px;">点击此处关闭 modal</h1>`,
					methods: {
						close(){
							this.$emit('close'); 
						}
					}
				}
			}); 
			myModal.launch(); 
		},
		sendToast(){
			this.$popup.toast({
				msg: this.toastText, 
				position: this.toastType, 
			})
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
		itit: function(){
			console.log('确认'); 
		},
		initAll: async function(){
			let res = await http.get('/api/user/me'); 

			this.user = res.data;
		},
		getUser: function(){
			return http.get('/api/user/me');
		},
		postWish: function(){
			let o = JSON.parse(JSON.stringify(this.wish)); 
			
			http.post('/api/wish', o); 
		}, 
		loadMore: async function(){
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
				// this.loading = false; 
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

.present {
	display: block;
	width: 90%; 
	font-size: 18px;
	
	padding: .6em 0; 

	border-radius: 4px; 
	margin: 1em auto; 
	
	background-color: rgb(240, 120, 50); 
	color: #FFF; 
	border: none;
	-webkit-appearance: none;
}

.name {
	margin: 1em; 
	font-size: 140%; 
}
</style>
