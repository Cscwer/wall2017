<template>
	<div class="gw-modal">
		<component class="gw-modal-inner" :is="component"
			v-bind="binding"
			v-on="event"
			@close="close">
		</component>
	</div>
</template>

<script>

export default {
	name: 'gw-modal', 
	props: ['component', 'binding', 'event'],
	data(){
		return {}
	},
	created(){
 		console.log('[ Modal Controller Ready ]'); 
	},
	methods: {
		close(){
			this.$emit('close'); 
		}
	}
}
</script>

<style>
.gw-modal {
	position: absolute;
	top: 0; 
	left: 0; 
	height: 100%; 
	width: 100%; 

	background-color: #FFF; 
}
</style>
