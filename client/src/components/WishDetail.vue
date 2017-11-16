<template>
	<div class="wish-detail">
		<div class="head">领取详情</div>
		
		<div v-if="finish" class="inner-wrap">
			<wish class="wish" :wish="wish" :myInfo="user" />
			<div class="getter">
				<span class="he">{{ toShowTable[toShow] }}</span>
				
				<div class="avatar-area">
					<img :src="wish[toShow].headimgurl" class="avatar" />
					<p class="name-bottom">{{ wish[toShow].nickname }}</p>
				</div>
				
				<div class="info">
					<div class="item">
						<div class="before">姓名：</div>
						<div class="content">{{ wish[toShow].nickname }}</div>
					</div>
					<div class="item">
						<div class="before">校区：</div>
						<div class="content">{{ areaTable[wish.he.area] }}</div>
					</div>
					<div class="item">
						<div class="before">微信：</div>
						<div class="content">{{ wish[toShow].weid || '　' }}</div>
					</div>
					<div class="item">
						<div class="before">电话：</div>
						<div class="content">{{ wish[toShow].phone　|| '　' }}</div>
					</div>
				</div>
			</div>

			<div class="btns">
				<div class="btn" @click.stop="startChat">发消息</div>
				<div class="btn active"
					v-if="wish.status === 1 && enable" @click.stop="ifItWorks">
					愿望已实现
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
import ui from '@/utils/ui'; 
import http from '@/utils/http.client';
import Chat_Component from './Chat';

// import SingleWish from './SingleWish'; 

export default {
	name: 'wish-detail', 
	props: {
		wish: {
			type: Object,
			required: true
		}, 
		toShow: {
			type: String, 
			default: 'he'
		},
		enable: {
			default: true
		}
	},
	// components: {
	// 	'single-wish': SingleWish
	// },
	data(){
		return {
			user: null,
			finish: false,
			// enable: true,
			areaTable: ['大学城', '东风路', '龙洞'],
			toShowTable: {
				'he': '领取人', 
				'she': '许愿者'
			}
		}
	},
	created(){
		console.log(this.wish)
		http.get('/api/user/me', ui.topLoading()).then(res => {
			this.user = res.data; 

			this.finish = true;
		})
	},
	methods: {
		ifItWorks(){
			var d = this.$popup.push({
				type: 'confirm', 
				confirmText: '确定已实现该愿望',
				needBlur: true, 
				handle: {
					confirm: () => {
						this.itWorks(); 
						d.close(); 
					}
				}
			}); 

			d.launch(); 
		},
		itWorks(){
			// 愿望已实现		
			http.post('/api/wish/end', {
				_id: this.wish._id
			}, ui.topLoading()).then(res => {
				if (res.code === 2000){
					this.$popup.toast({
						msg: '你的愿望已实现', 
						position: 'bottom', 
						align: true
					});

					this.enable = false; 
					this.$emit('wishEnd'); 
				} else {
					this.$popup.toast({
						msg: '出错啦，错误代码：' + res.code, 
						position: 'bottom', 
						cancelable: true,
					})
				}
			})
		},
		startChat(){
			// 开始聊天

			var chat_selected = {
				type: "chat",
				content: "",
				from: this.wish[this.toShow],
				myself: true,
				create_at: Date.now(),
				unread: false
			}

			var chatCop = this.$popup.push({
                type: 'modal',
                component: Chat_Component,
                binding: {
                    chatSelected: chat_selected
                },
                event: {
                    sayHello: function(msg) {
                        console.log(msg);
                    }
                }
            })

            chatCop.launch();
		}
	}
}
</script>

<style scoped>

.head {
    font-size: 16px;
    color: rgb(222, 150, 150);
    text-align: center;
    line-height: 50px;
    background-color: #FFF; 
	margin-bottom: 1em; 
}

.inner-wrap {
	width: 92%; 
	margin: 0 auto 1em auto; 
}

.wish {
	margin-bottom: 2em; 
}

.wish-detail {

}

.getter {
	position: relative;
	background-color: rgb(254, 199, 196);
	border-radius: 12px; 

	box-sizing: border-box;
	padding: 1.5em; 
	margin-bottom: 2.2em; 
}

.he {
	position: absolute;
	font-size: 14px;
	left: 1.5em;
	padding: 4px 8px;
	color: rgb(255, 141, 135);
	transform: translateY(-50%);
	background-color: #FFF; 
	border-radius: 8px; 
	top: 0; 
}

.info {
	margin-top: 1em; 
	padding-left: 5em; 
	font-size: 16px; 
	color: #FFF; 
}

.avatar-area {
	position: absolute;
	color: #FFF; 
	text-align: center;
	top: 48px;
	left: 1.5em;
}

.avatar-area .name-bottom {
	padding: 4px 0; 
	font-size: 16px; 
}

.item {
	position: relative;
	margin-left: 3em; 
	margin-bottom: .9em; 
}

.before {
	position: absolute;
	right: 100%; 
	white-space: nowrap;
}

.content {
	padding: 2px 8px; 
	box-sizing: border-box;
	border-radius: 6px; 
	background-color: #FFF;
	color: #555; 
	min-height: 1em; 
}

.avatar {
	width: 64px;
	height: 64px; 
	border-radius: 64px; 
}

.btns {
	font-size: 20px; 
	text-align: center;
}

.btn {
	background-color: #FFF; 
	width: 55%; 
	display: inline-block;
	margin-bottom: 1em; 
	padding: .5em 0px; 
	border-radius: 100px; 
	color: rgb(250, 152, 146);
	box-shadow: 0px 5px 16px 0px rgba(254, 150, 140, .3);
}

.active {
	background-color: rgb(255, 153, 138);
	color: #FFF; 
	box-shadow: none;
}

</style>
