<template>
	<div class="gw-prompt">
		<component class="gw-modal-inner" :is="component"
			v-if="component"
			v-bind="binding"
			v-on="event">
		</component>

		<textarea v-else class="gw-prompt-textarea" v-model="now_input" :placeholder="placeholderText"></textarea>

		<div class="gw-confirm-btns">
			<span @click="innerConfirm" class="gw-sent-btn">
				{{ confirmText }}
			</span>
			<img :src="cancel_png" @click="innerCancel" class="gw-cancel-btn"></img>
		</div>
	</div>
</template>

<script>
import cancel_png from './static/cancel.png'; 

export default {
	name: 'gw-prompt', 
	props: ['confirmText', 'placeholderText', 'component', 'binding', 'event'],
	data(){
		return {
			now_input: '', 
			cancel_png: cancel_png
		}
	},
	created(){
 
	},
	methods: {
		innerConfirm(){
			this.$emit('confirm', this.now_input);
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

.gw-sent-btn {
	position: absolute;
	top: 100%; 
	left: 20%; 
	width: 60%; 
	padding: .5em 0;
	text-align: center;
	transform: translateY(-50%);

	color: #FFF; 
	border-radius: 100px; 
	background-color: rgb(255, 116, 116);
	
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
