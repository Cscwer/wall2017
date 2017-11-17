<template>
	<div class="gw-confirm">
		<component class="gw-modal-inner" :is="component"
			v-if="component"
			v-bind="binding"
			v-on="event">
		</component>

		<img v-else class="gw-confirm-picture" :src="snowStick_png" />
	

		<div class="gw-confirm-btns"  v-if="confirmText">
			<span @click="innerConfirm" class="gw-confirm-btn gw-confirm-yes">
				{{ confirmText }}
			</span>
			<img :src="cancel_png" @click="innerCancel" class="gw-cancel-btn"></img>
		</div>

		
	</div>
</template>

<script>
import snowStick_png from './static/snow-stick.png'; 
import cancel_png from './static/cancel.png'; 

export default {
	name: 'gw-confirm', 
	props: ['confirmText', 'img', 'component', 'binding', 'event'],
	data(){
		return {
			snowStick_png: snowStick_png,
			cancel_png: cancel_png
		}
	},
	created(){
 
	},
	methods: {
		innerConfirm(){
			this.$emit('confirm');
		},
		innerCancel(){
			this.$emit('cancel');
		}
	}
}
</script>

<style scoped>
.gw-confirm {
	position: absolute;
	width: 80%; 
	left: 10%; 
	bottom: 50%; 
	transform: translateY(20%);
	background-color: #FFF; 

	
	padding: 1em; 
	font-size: 18px; 
	border-radius: 12px;
	box-sizing: border-box;
	box-shadow: 0 8px 60px -6px rgba(0, 0, 0, .4); 
}

.gw-confirm-btns {
	
}

.gw-confirm-btn {
	display: block;
	text-align: center;
	padding: .45em 0;
	box-sizing: border-box;
	
	color: #FFF; 
	background-color: rgb(240, 207, 56);
	border-radius: 6px;
}

.gw-cancel-btn {
	position: absolute;
	top: 10px; 
	right: 10px; 
	width: 21px; 
	height: 21px; 
}

.gw-confirm-picture {
	width: 60%; 
	display: block;
	margin: 0 auto 1em auto; 
}
</style>
