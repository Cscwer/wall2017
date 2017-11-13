<template>
	<div class="wish-search-container"
		v-infinite-scroll="loadMore"
		infinite-scroll-disabled="searchMore && !finish"
		infinite-scroll-distance="20">
		<input type="text" @keyup="search()" name="searchWish" class="searchWish" placeholder="搜索愿望..." v-model="text">
		<div v-if="!searching">
			<div class="select-container">
				<div class="select-type-container">
					<div class="certain">
						<input type="checkbox" name="type" :value="0" class="radio" id="time" v-model="type">
						<label class="select-box" for="time">耗时类</label>
						<input type="checkbox" name="type" :value="1" class="radio" id="staff" v-model="type">
						<label class="select-box" for="staff">实物类</label>
					</div>
				</div>
				<div class="select-type-container">
					<div class="certain">
						<input type="checkbox" name="area" :value="0" class="radio" id="town" v-model="area">
						<label class="select-box" for="town">大学城校区</label>
						<input type="checkbox" name="area" :value="1" class="radio" id="road" v-model="area">
						<label class="select-box" for="road">东风路校区</label>
						<input type="checkbox" name="area" :value="2" class="radio" id="hole" v-model="area">
						<label class="select-box" for="hole">龙洞校区</label>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<div v-if="loading" class="no-wish">拼命寻找中 ...</div>
			<div v-else>
				<div class="no-wish" v-if="list.length === 0 && !loading && text !== ''">没有相关的愿望哦（≧∇≦）</div>
				<div v-else>
					<wish class="wish-on-wall" v-for="wish in list" :wish="wish" :myInfo="user"></wish>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import wait from '@/utils/wait';
	import http from '@/utils/http.client';
	import Wish from './SingleWish';

	let timer = null;

	export default {
		name: 'wish-search',
		components: {
			'wish': Wish
		},
		data(){
			return {
				searching: false,
				loading: false,
				text: '',
				searchMore: true,
				finish: false,
				user: {},
				p: 0,
				type: [],
				area: [],
				list: []
			}
		},
		created(){
			console.log('on load');
			this.initAll();
		},
		methods: {
			initStatus() {
				this.type = [];
				this.area = [];
				this.list = [];
				this.p = 0;
				this.searching = false;
			},
			search() {
				if(!this.text.trim()) {
					this.initStatus();
				} else {
					this.searching = true;
					this.loading = true;
					clearTimeout(timer);
					timer = setTimeout(() => {
						this.loadMore();
					}, 1000);
				}
			},
			toSearch: function() {
				return http.post('/api/wish/search', {
					q: this.text,
					p: this.p,
					wishtype: this.type,
					area: this.area
				})
			},
			initAll: async function(){
				let res = await http.get('/api/user/me');
				this.user = res.data;
			},
			loadMore: async function(){
				let p = this.p;
				this.loading = false;
				this.searchMore = true;

				let rps = await this.toSearch();

				console.log(rps);

				this.p = p + 1;
				this.list = this.list.concat(rps.data);

				if (rps.code === 2001){
					this.finish = true;
					console.log(p + ' : end!!');
				} else {
					console.log(p + ' : not end');
				}
				this.searchMore = false;
			}
		}
	}
</script>

<style scoped>
html, body {
	height: 100%;
}

.wish-search-container {
	height: 100%;
	background-color: rgb(255, 241, 241);
}

.searchWish {
	padding: 10px 3%;
	width: 100%;
	border: none;
	font-size: 15px;
	letter-spacing: 1px;
	background-color: #fff;
	box-sizing: border-box;
}

.select-container {
	width: 94%;
	margin: 15px auto;
	padding: 15px 20px;
	border-radius: 10px;
	background-color: #fff;
	box-sizing: border-box;
}

.select-type-container {
	padding-top: 15px;
	box-sizing: border-box;
	background-color: #f9f9f9;
	font-size: 0 !important;
}

.certain {
	margin: 0 auto;
	/*width: 85%;*/
	padding: 0 5%;
	font-size: 0 !important;
}

.select-type-container:first-of-type {
	margin-bottom: 10px;
}

.select-box {
	display: inline-block;
	width: 47%;
	height: 30px;
	margin-bottom: 15px;
	font-size: 14px;
	line-height: 30px;
	color: #fff;
	text-align: center;
	box-sizing: border-box;
	border-radius: 5px;
	background-color: #ffd0d0;
}

.select-box:first-of-type {
	margin-right: 6%;
}

.selected {
	background-color: #ff7272;
}

.no-wish {
	width: 100%;
	margin-top: 35vh;
	text-align: center;
	width: 100%;
	color: rgba(248, 153, 138, 1);
	font-size: 0.46rem;
	/*text-align: center;*/
}

.wish-on-wall {
	margin: 14px auto;
	width: 93%;
}

.radio {
	display: none;
	width: 0;
	height: 0;
	opacity: 0;
}

.radio:checked + label {
	background-color: #ff7272;
}
</style>
