<template>
	<div class="wish-search-container">
		<h1 @click="back">hello, world</h1>
	</div>
</template>

<script>
	export default {
		name: 'wish-search',
		data(){
			return {}
		},
		created(){
			console.log('on load')
		},
		methods: {
			back(){}
		}
	}
</script>

<style scoped>

</style>
