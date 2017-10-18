<template>
	<div id="app">
		<div :class="{ isBlur: popup.isBlur }" class="blur-area">
			<router-view class="page"></router-view>

			<footer class="footer-tabs">
				<div
					:class="{
						'tab': true,
						'tab-middle': tab.path === '/wish',
						'tab-active': tab.active
					}"

					v-for="(tab, idx) in tabs"
					@click="routeTo(tab, idx)">
					<!-- {{ tab.text }} -->
					<img class="tab-icon" :src="tab.active ? tab.icon.fill : tab.icon.outline">
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
let iconTable = [
	'home', 'me', 'music', 'ping'
].reduce((acc, name) => {
	let outline = require(`./assets/tab/${name}-outline.png`); 
	let fill = require(`./assets/tab/${name}-fill.png`); 

	acc[name] = {
		outline, 
		fill
	}; 

	return acc; 
}, {}); 

let wishFill = require(`./assets/tab/wish-fill.png`); 

let tabs = [
	{
		text: '许愿',
		path: '/wall',
		active: true, 
		icon: iconTable.home
	},
	{
		text: '电台',
		path: '/music',
		active: false,
		icon: iconTable.music
	},
	{
		text: '发布',
		path: '/wish',
		active: false,
		icon: {
			outline: wishFill, 
			fill: wishFill
		}
	},
	{
		text: '匹配', 
		path: '/love',
		active: false,
		icon: iconTable.ping
	},
	{
		text: '我的', 
		path: '/me',
		active: false,
		icon: iconTable.me
	}
]

export default {
	name: 'app', 
	data(){
		return {
			tabs: tabs,
			popup: {
				isBlur: false	
			},
			pageWidth: window.innerWidth
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
		}, 

		popupMsg(data){
			console.log(data); 
			this.popup.isBlur = data.isBlur; 
		}
	}
}
</script>

<style>
#app {
	transition: filter .3s; 
}

.blur-area {
	transition: filter .3s; 
}

.isBlur {
	filter: blur(3px); 
}

.tab-active {
	color: #FFF; 
}

.tab {
	/*position: relative;*/
	width: 25%; 
	text-align: center;
}

.tab-icon {
	width: 40%; 
}

.tab-middle img {
	position: absolute;
	bottom: -.2em; 
	left: 37.5%; 
	width: 25% 
}

.footer-tabs {
	position: fixed;
	bottom: 0; 
	left: 0;
	width: 100%; 
	background-color: #FFF; 
	display: flex;
	
	padding: .8em 0; 
	align-items: center;

	justify-content: space-between;
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
