<template>
	<div class="gw-prompt">
		<component class="gw-modal-inner" :is="component"
			v-if="component"
			v-bind="binding"
			v-on="event">
		</component>

		<div v-else>此组件没有默认组件，请传入 component 字段进行渲染</div>

		<div class="gw-confirm-btns">
			<span @click="innerConfirm" class="gw-sent-btn gw-confirm-theme">
				{{ confirmText }}
			</span>
			<span @click="innerCancel" class="gw-sent-btn gw-cancel-theme">
				{{ cancelText }}
			</span>
		</div>

		<img :src="cancel_png" @click="innerCancel" class="gw-cancel-btn"></img>
	</div>
</template>

<script>
import cancel_png from './static/cancel.png'; 

export default {
	name: 'gw-alert-sheet', 
	props: ['confirmText', 'img', 'component', 'binding', 'event', 'cancelText'],
	data(){
		return {
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

.gw-prompt {
	position: absolute;
	width: 80%; 
	left: 10%; 
	bottom: 60%; 
	transform: translateY(50%);
	background-color: #FFF; 

	box-sizing: border-box;

	padding: 1.5em 1em; 

	font-size: 18px; 

	border-radius: 12px;

	box-shadow: 0 8px 60px -6px rgba(0, 0, 0, .4); 
}

@media screen and (max-width: 370px) and (min-width: 320px) {
	.gw-prompt {
		bottom: 55%; 
		width: 88%!important; 
		left: 6%!important;
	}
}

.gw-cancel-btn {
	position: absolute;
	top: 0px; 
	right: 0px; 
	width: 21px; 
	height: 21px; 

	padding: 10px; 

	background-image: url();
}

.gw-confirm-btns {
	position: absolute;
	top: 100%; 
	left: 0%; 
	width: 100%;
	font-size: 0; 
	text-align: center;
	transform: translateY(-50%);
}

.gw-sent-btn {
	font-size: 16px; 
	display: inline-block;
	width: 40%; 
	margin: 0 2.5%; 
	box-sizing: border-box;
	border-radius: 100px; 
	padding: .4em .6em; 
	
}


.gw-cancel-theme {
	color: #FFF; 
	background-color: rgb(255, 116, 116);
} 

.gw-confirm-theme {
	color: #FFF; 
	background-color: rgb(249, 213, 44);
}

.gw-prompt-textarea {
	width: 100%; 
	min-height: 10em;
	font-size: 14px; 
	border: none;
	resize: none;
	color: #555;
}
</style>
