<template>
	<div class="board">
		<div class="head">留言信息</div>

		<div class="board-inner">
			<ul class="wish-list">
				<transition-group name="wish-load" tag="div" >
					<li v-for="(msg, idx) in list" class="wish" :key="idx" :style="{
							'transition-delay': ((idx % 10) / 10 + .2) + 's'}
						">
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
							<div class="reply" @click="replyTo(msg.from)">回复</div>
						</div>
					</li>
				</transition-group>

				<div class="no-data-here" v-if="list.length === 0">
					暂无愿望动态
				</div>
			</ul>
		</div>
	</div>
</template>

<script>
import http from '@/utils/http.client';
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
	},
	methods: {
		timeParse(ts){
			if (!ts) return ''; 

			var d = new Date(ts);
			var h = d.getHours(); 
			var m = d.getMinutes();

			h = ('00' + h).slice(-2); 
			m = ('00' + m).slice(-2); 

			return h + ':' + m; 
		},
		replyTo(user){
			var _id = user._id;

			let getInput =  this.$popup.push({
				type: 'prompt',
				confirmText: '确认',
				placeholderText: '输入给ta的留言',
				handle: {
					confirm: (input) => {
						http.post('/api/msg', {
							from: this.me && this.me._id,
							to: _id, 
							content: input
						}, ui.topLoading()).then(res => {
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
	padding: 16px 18px; 
	margin-bottom: 1.8em; 
	min-height: 60px; 
	box-shadow: 0px 5px 15px 0px rgba(254, 150, 140, .25);
	border-radius: 14px; 
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
	font-size: 16px;
}

.inner .msg {
	font-size: 14px; 
	color: rgb(171, 171, 171); 
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}

.inner .time {
	position: absolute;
	right: 0; 
	color: rgb(171, 171, 171); 
	font-size: 12px; 
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