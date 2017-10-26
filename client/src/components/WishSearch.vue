<template>
	<div class="wish-search-container">
		<!-- <h1 @click="back">hello, world</h1> -->
		<input type="text" @keyup.enter="search()" name="searchWish" class="searchWish" placeholder="搜索愿望..." v-model="text">
		<div v-if="!searching">
			<div class="select-container">
				<div class="select-type-container">
					<div class="certain">
						<input type="checkbox" name="type" value="time" class="radio" id="time" v-model="type">
						<label class="select-box" for="time">耗时类</label>
						<input type="checkbox" name="type" value="staff" class="radio" id="staff" v-model="type">
						<label class="select-box" for="staff">实物类</label>
					</div>
				</div>
				<div class="select-type-container">
					<div class="certain">
						<input type="checkbox" name="area" value="town" class="radio" id="town" v-model="area">
						<label class="select-box" for="town">大学城校区</label>
						<input type="checkbox" name="area" value="road" class="radio" id="road" v-model="area">
						<label class="select-box" for="road">东风路校区</label>
						<input type="checkbox" name="area" value="hole" class="radio" id="hole" v-model="area">
						<label class="select-box" for="hole">龙洞校区</label>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<wish class="wish-on-wall" v-for="wish in list" :userData=wish.user :userWish=wish.wish></wish>
		</div>
	</div>
</template>

<script>
	import Wish from './SingleWish';
	export default {
		name: 'wish-search',
		components: {
			'wish': Wish
		},
		data(){
			return {
				searching: false,
				text: '',
				type: ['time'],
				area: ['town'],
				list: [
					{
						user: {
							name: '中国首穷',
							area: 1,
							headimgurl: '',
							sex: 2
						},
						wish: '我要上王者'
					},
					{
						user: {
							name: 'legilis',
							area: 2,
							headimgurl: '',
							sex: 2
						},
						wish: '我要上王者我，我沃尔夫见多识广覅ulUI我耳机不好 就回来维护费'
					},
					{
						user: {
							name: 'legilis',
							area: 0,
							headimgurl: '',
							sex: 2
						},
						wish: '我要上王者wekiuajsliofaksvgjxjlasieujlfksdzjushoduiflhajkdfnuaps;dlkjfkahdlfiasjdkfdnlfiwqe'
					},
					{
						user: {
							name: 'legilis',
							area: 1,
							headimgurl: '',
							sex: 2
						},
						wish: '这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。这是一段很长的文字。'
					}
				]
			}
		},
		created(){
			console.log('on load')
		},
		methods: {
			back(){},
			search() {
				console.log(this.text);
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
	caret-color: #ff7272;
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
