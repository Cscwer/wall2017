<template>
	<div class="wish-msg-list">
		<div class="head">愿望动态</div>

		<ul class="wish-list">
			<li v-for="(wish, idx) in list" class="wish" @click="gotoWishDetail(wish, idx)">
				<!-- <span class="new-msg" v-if="wish.unread"></span> -->
				<img :src="wish.type === 'wish-pull' ? wish.data.he.headimgurl : wish.data.she.headimgurl" class="avatar" />
				<div class="inner">
					<div class="new-msg" v-if="wish.unread">NEW</div>
					<div class="name">
						{{ wish.type === 'wish-pull' ? wish.data.he.nickname : wish.data.she.nickname }}

						<span class="time">
							{{ timeParse(wish.create_at) }}
						</span>
					</div>
					<p class="msg">{{ wish.msg }}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
// import ui from '@/utils/ui'; 
import http from '@/utils/http.client';
import chat from '@/utils/chat'; 
import LsArray from '@/utils/ls/LsArray'; 
import WishDetail from './WishDetail'; 

export default {
	name: 'wish-msg-list', 
	data(){
		return {
			list: []
		}
	},
	created(){
		this.listLoad(); 
	},
	methods: {
		listLoad(){
			let list = new LsArray('wish-msgs');
			this.list = list.toArray(); 
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
		gotoWishDetail(wishMsg, idx){
			let list = new LsArray('wish-msgs');
			list.findAndMap(idx, inner => {
				inner.unread = false;
				return inner;
			}); 
			this.listLoad(); 

			let self = this; 
			let ins = this.$popup.push({
				type: 'modal',
				component: WishDetail,
				binding: {
					wish: wishMsg.data
				},
				event: {
					wishEnd(){
						let list = new LsArray('wish-msgs');

						list.findAndMap(idx, inner => {
							inner.data.status = 2; 

							return inner;
						}); 

						self.listLoad(); 
					}
				},
				bg: 'rgb(255, 241, 241)'
			});

			ins.launch(); 
		}
	}
}
</script>

<style scoped>
.wish-msg-list {
	color: #555; 
}

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
	line-height: 24px; 
	margin-left: 60px; 
}

.inner .name {
	font-size: 18px;
}

.inner .msg {
	font-size: 15px; 
	color: rgb(171, 171, 171); 
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}

.inner .time {
	position: absolute;
	right: 0; 
	color: rgb(171, 171, 171); 
	font-size: 15px; 
}



</style>
