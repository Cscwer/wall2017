<template>
	<div class="my-info-outside">
		<div class="my-info" @click="close">
			<div class="my-info-item">
				<label for="my-info-nickname">姓名：</label>
				<input class="gw-input-area" id="my-info-nickname" type="text" v-model="toEdit.nickname" />
			</div>
		
			<div class="my-info-item">
				<label for="my-info-area">校区：</label>
				<span class="my-info-down">
					<svg t="1508482206843" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2348" xmlns:xlink="http://www.w3.org/1999/xlink">
						<path d="M163.446154 275.692308l697.107692 0c19.692308 0 33.476923 25.6 17.723077 43.323077l-340.676923 417.476923c-11.815385 15.753846-37.415385 15.753846-49.230769 0l-344.615385-417.476923c-13.784615-17.723077-1.969231-43.323077 19.692308-43.323077z" p-id="2349" fill="#707070"></path>
					</svg>
				</span>
				<select class="gw-input-area" id="my-info-area" v-model="toEdit.area">
					<option disabled value="">请选择</option>
					<option :value="0">大学城</option>
					<option :value="1">东风路</option>
					<option :value="2">龙洞</option>
					<option :value="3">番禺</option>
				</select>
			</div>
		

			<div class="my-info-item">
				<label for="my-info-weid">微信：</label>
				<input class="gw-input-area" id="my-info-weid" type="text" v-model="toEdit.weid" />
			</div>
		
			<div class="my-info-item">
				<label for="my-info-phone">电话：</label>
				<input class="gw-input-area" id="my-info-phone" type="tel" v-model="toEdit.phone" />
			</div>
		</div>
	</div>
</template>

<script>
import wait from '@/utils/wait'; 
import http from '@/utils/http.client'; 

export default {
	name: 'my-info',
	props: ['toEdit'],
	data() {
		return {}
	},
	created(){

	},
	methods: {
		close(){
			this.$emit('close'); 
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-info-outside {
	/*padding: 1em 1.2em; */
	padding: .5em 1.2em .5em 1em;
}

.my-info {
	position: relative;
	font-size: 14px; 
	padding-left: 3em; 

}

label {
	position: absolute;
	left: -3em;
}

.gw-input-area {
	border: none;
	border-radius: 4px; 
	background-color: rgb(238, 238, 238);
	width: 100%; 
	box-sizing: border-box;
	padding: 2px 6px; 
	color: inherit;

	appearance: none;
	-webkit-appearance: none;
}

.my-info-item {
	position: relative;
	margin-bottom: .8em; 
	color: rgb(79, 79, 79);
}

.my-info-down {
	position: absolute;
	right: 6px; 
	top: 4px;
}

.my-info-down svg {
	/*width: 15px; */
	height: 1em;
}
</style>
