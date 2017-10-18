<template>
	<div>
		<h1>我的个人中心</h1>
	
		<div class="imgs">
			<img :src="localId" v-for="localId in localIds" />
		</div>
	
		<img :src="show" alt="">
	</div>
</template>

<script>
import wait from '@/utils/wait'; 
import http from '@/utils/http.client'; 
import vwx from '@/utils/vwx'; 
		

export default {
	name: 'me', 
	data(){
		return {
			localIds: [], 
			show: ''
		}
	}, 
	created(){

		vwx.getAnImg().then(res => {
			alert('start'); 
			let img = res.data; 
			// console.log(img);
			console.log(JSON.stringify(res)); 

			this.show = img.url; 
		});
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
