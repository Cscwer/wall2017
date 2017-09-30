<template>
	<div id="app">
		<router-view class="page"></router-view>


		<footer class="footer-tabs">
			<div class="tab" v-for="(tab, idx) in tabs"
				@click="routeTo(tab, idx)"
				v-bind:class="{ 'tab-active': tab.active }">
				{{ tab.text }}
			</div>
		</footer>
	</div>
</template>

<script>
let tabs = [
	{
		text: '许愿',
		path: '/wall',
		active: true
	},
	{
		text: '电台',
		path: '/music',
		active: false
	},
	{
		text: '发布',
		path: '/wish',
		active: false
	},
	{
		text: '匹配', 
		path: '/love',
		active: false
	},
	{
		text: '我的', 
		path: '/me',
		active: false
	}
]

export default {
	name: 'app', 
	data(){
		return {
			tabs: tabs
		}
	},
	methods: {
		routeTo: function(tab, idx){
			let { path } = tab; 
			console.log(tab, idx); 

			this.tabs.forEach(tab => {
				tab.active = false; 
			}); 

			tab.active = true; 

			this.$router.push({
				path: path
			}); 
		}
	}
}
</script>

<style>
.tab-active {
	color: #FFF; 
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	/*margin-top: 60px;*/
}

.footer-tabs {
	position: fixed;
	bottom: 0; 
	left: 0;
	width: 100%; 
	height: 30px; 
	background-color: #BBB; 
	display: flex;

	justify-content: space-between;
}

.tab {
	width: 25%; 
	line-height: 30px; 
	text-align: center;
}

.page {
/*	position: fixed; 
	width: 100%; 
	left: 0; 
	top: 0; 
	height: 100%; 
	overflow-y: scroll;*/
}
</style>
