<template>
	<div class="board">
		<div class="head">留言信息</div>

		<div class="board-inner">
			<ul class="wish-list">
				<transition-group name="wish-load" tag="div" >
					<div v-for="(msg, idx) in list" :key="idx" :style="{
						'transition-delay': ((idx % 10) / 10 + .2) + 's'}
					" class="wish">
						<li class="wish-main">
							<!-- <span class="new-msg" v-if="wish.unread"></span> -->
							<img :src="msg.from.headimgurl" class="avatar" />
							<div class="inner">
								<!-- <div class="new-msg">NEW</div> -->
								<div class="name">
									{{ msg.from.nickname }}
									<span class="time">
										{{ timeParse(msg.created_at) }}
									</span>
								</div>
								<p class="msg">{{ areaTable[msg.from.area] }}</p>
							</div>

							<div class="content">
								{{ msg.content }}
							</div>

							<div style="text-align: right;">
								<div class="reply" @click="replyTo(msg)">回复</div>
							</div>
						</li>
						
						<div class="wish-sub" v-if="msg.inner.length !== 0">
							<li class="sub-replay" v-for="(innerMsg, idx) in msg.inner" :class="{
								'with-border': idx !== (msg.inner.length - 1)
							}">
								<!-- <span class="new-msg" v-if="wish.unread"></span> -->
								<img :src="innerMsg.headimgurl" class="avatar" />
								<div class="inner">
									<!-- <div class="new-msg">NEW</div> -->
									<div class="name">
										{{ innerMsg.nickname }}
										<span class="time">
											{{ timeParse(innerMsg.created_at) }}
										</span>
									</div>
									<p class="msg">{{ areaTable[innerMsg.area] }}</p>

									<div class="content">
										{{ innerMsg.content }}
									</div>
								</div>
							</li>
						</div>
					</div>
				</transition-group>
				
				
				<div class="no-data-here" v-if="list.length === 0">
					暂无留言信息
				</div>

			</ul>
		</div>
	</div>
</template>

<script>
import http from '@/utils/http.client';
import ws from '@/utils/ws.client'; 
import ui from '@/utils/ui';

export default {
	name: 'board',
	data(){
		return {
			list: [],
			me: null, 
			areaTable: ['大学城', '东风路', '龙洞']
		}
	}, 
	created(){
		var cancel = ui.showLoading(); 

		http.get('/api/user/me').then(res => {
			if (res.code === 2000){
				this.me = res.data; 
			}

			return http.get('/api/msg')
		}).then(res => {
			if (res.code === 2000){
				res.data.reverse(); 
				this.list = res.data; 
			} else {
				// error 
			}

			cancel(); 
		}); 

		var onMsg = msg => {
			console.log('!!', msg); 

			if (msg.type === 'msg-to-you'){
				this.list.unshift(msg.data); 
			}
		}
		ws.bus.$on('onMsg', onMsg);
	},
	methods: {
		reload(){
			
		},
		timeParse(ts){
			if (!ts) return ''; 

			var d = new Date(ts);
			var h = d.getHours(); 
			var m = d.getMinutes();

			h = ('00' + h).slice(-2); 
			m = ('00' + m).slice(-2); 

			return h + ':' + m; 
		},
		replyTo(msg){
			// var _id = user._id;
			// var from = msg.from; 

			let getInput =  this.$popup.push({
				type: 'prompt',
				confirmText: '确认',
				placeholderText: '输入给ta的留言',
				handle: {
					confirm: (input) => {
						http.post('/api/msg/inner', {
							_id: msg._id,
							nickname: this.me && this.me.nickname,
							from: this.me && this.me._id,
							area: this.me && this.me.area, 
							headimgurl: this.me && this.me.headimgurl, 
							content: input
						}, ui.topLoading()).then(res => {
							this.$popup.toast({
								msg: '留言成功',
								position: 'bottom',
								cancelable: true
							});

							msg.inner.push(res.data); 
							getInput.close()
						}); 
					}
				}
			});
			getInput.launch();
		}
	}
}
</script>

<style scoped>
.head {
    font-size: 16px;
    /*color: rgb(222, 150, 150);*/
    background-color: #FFF; 
    text-align: center;
    line-height: 50px;
}

.wish {
	position: relative;
	background-color: #FFF; 
	box-sizing: border-box;
	word-break: break-all;
	margin-bottom: 1.8em; 
	min-height: 60px; 
	box-shadow: 0px 5px 15px 0px rgba(254, 150, 140, .25);
	border-radius: 14px; 
}

.wish-main {
	padding: 16px 18px; 
}

.wish-sub {
	font-size: 85%; 
	background-color: rgb(249, 249, 249);
	/*padding: 16px 18px 16px 28px; */
		
	padding: 16px 0; 
	border-radius: 0 0 14px 14px; 
}

.sub-replay {
	padding: 0px 18px 0px 28px; 
	padding-bottom: .3em; 
	
}

.with-border {
	border-bottom: 1px solid rgb(238, 238, 238); 
	margin-bottom: 1.2em; 
}

.wish-list {
	width: 90%; 
	margin: 2em auto; 
}

.avatar {
	position: absolute;
	left: 16px; 
	width: 48px;
	height: 48px; 
	border-radius: 50px;
}

.wish-sub .avatar {
	left: 33px; 
	width: 40px; 
	height: 40px; 
}

.new-msg {
	right: 101%;
	top: -6px;
	font-size: 8px;
	color: #FFF; 
	
	padding-left: 6px;
	padding-right: 6px; 
	line-height: 18px;
	border-radius: 100px;
	position: absolute;
	display: inline-block;
	text-align: right;
	background-color: red; 
}

.inner {
	position: relative;
	line-height: 20px; 
	margin-left: 60px; 
	margin-top: 6px;
}

.inner .name {
	font-size: 130%;
}

.inner .msg {
	font-size: 120%; 
	color: rgb(171, 171, 171); 
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}

.inner .time {
	position: absolute;
	right: 0; 
	color: rgb(171, 171, 171); 
	font-size: 70%; 
}

.no-data-here {
	margin-top: 25vh;
    text-align: center;
    width: 100%;
    color: rgb(248, 153, 138);
    font-size: 0.46rem;
}

.wish-load-enter-active, .wish-load-leave-active {
	transition: all .3s;
	/*transition-delay: .6s; */
}
.wish-load-enter, .wish-load-leave-to {
	transform: translateY(100%);
	opacity: 0;
}

.content {
	color: #555; 
	margin: 1em 0; 
	font-size: 14px;
}

.wish-sub .content {
	margin: .4em 0; 
}

.reply {
	background-color: rgb(240, 207, 56);
	color: #FFF; 
	text-align: center;
	width: 7em; 
	border-radius: 10em; 
	padding: 4px 0;
	display: inline-block;
}
</style>