<template>
	<div class="gw-alert">
		<div class="gw-alert-bg"></div>
		
		<div class="gw-alert-inner">
			<p class="gw-alert-text">确定删除该愿望?</p>
			
			<div class="gw-alert-btns">
				<span @click="innerConfirm" class="gw-alert-btn gw-alert-red">
					{{ confirmText }}
				</span>
				<span @click="innerCancel" class="gw-alert-btn gw-alert-grey">
					{{ cancelText }}
				</span>
			</div>
		</div>
		
	</div>
</template>

<script>

export default {
	name: 'gw-alert', 
	props: ['confirmText', 'cancelText'],
	data(){
		return {
			
		}
	},
	methods: {
		innerConfirm(){
			this.$emit('confirm');

			this.hideItSelf();
		},
		innerCancel(){
			this.$emit('cancel'); 

			this.hideItSelf()
		},
		hideItSelf(){
			
		}
	}
}
</script>

<style scoped>
.gw-alert {
	position: fixed;
	z-index: 100; 
	top: 0;
	left: 0;
	height: 100%;
	width: 100%; 
	text-align: center;
}

.gw-alert-bg {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	height: 100%; 
	width: 100%; 
	background-color: rgba(0, 0, 0, .5);
}

.gw-alert-text {
	font-size: 18px; 
	padding-top: 2em;
	margin-bottom: 2em; 
}

.gw-alert-inner {
	position: absolute;
	left: 10%; 
	width: 80%; 
	padding: 1em 1em 1.6em 1em; 

	top: 50%;
	transform: translateY(-75%);

	min-height: 20%;
	
	border-radius: 1em; 
	box-sizing: border-box;
	background-color: #FFF;
}

.gw-alert-btns {
	font-size: 0; 
}
.gw-alert-btn {
	display: inline-block;
	font-size: 16px; 
	width: 40%; 
	margin: 0 5%;
	border-radius: .2em; 
	padding: .6em 0em;
	box-sizing: border-box;
}

.gw-alert-grey {
	background-color: rgb(187, 187, 187);
	color: #FFF; 
	box-shadow: 0 0 8px rgb(187, 187, 187);
}

.gw-alert-red {
	background-color: #F00; 
	color: #FFF; 
	box-shadow: 0 0 8px #F00;
}

</style>
