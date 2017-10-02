<template>
	<div>
		<h1>我的个人中心</h1>
	
		<div class="imgs">
			<img :src="localId" v-for="localId in localIds" />
		</div>

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
			localIds: []
		}
	}, 
	created(){
		vwx.getAnImg().then(serverId => {
			
			console.log(serverId)
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
