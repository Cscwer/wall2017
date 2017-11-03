<template>
	<div class="gw-loading">
		<div class="spinner"></div>
	</div>
</template>

<script>

export default {
	name: 'gw-loading', 
	props: [],
	data(){
		return {}
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
.gw-loading {
	position: absolute;
	width: 120px; 
	height: 120px; 
	left: 50%; 
	top: 50%; 
	transform: translate(-50%, -100%);
	background-color: rgba(0, 0, 0, .5); 
	box-sizing: border-box;
	border-radius: 12px;
}

@keyframes rotating {
    100% {
        transform: rotate(360deg);
    }
}

.spinner {
	margin: 0 auto; 
    border-radius: 50%;
    margin-top: 28px;
    width: 50px;
    height: 50px;
    border: 6px solid rgba(255, 255, 255, 0.3);
    border-top: 6px solid rgba(255, 255, 255, 1);
    animation: rotating 1s infinite linear;
}
</style>
