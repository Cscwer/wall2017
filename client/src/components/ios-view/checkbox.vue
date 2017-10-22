<template>
	<div ios-checkbox>
		<input class="hidden-input" type="checkbox" v-model="value" />
		<svg class="slider" width="47" height="27"> 
			<path class="tracker"
				d="M 13.5 26 A 12.5 12.5 180 0 1 13.5 1 L 38.5 0 A 25 25 180 0 1 38.5 26 L 13.5 26"
				style="fill: none;"
			/>
		</svg>
		<div class="circle"></div>
	</div>
</template>

<script>

export default {
	name: 'ios-checkbox', 
	props: ['value'],
	data: function(){
		return {
			val: false
		}
	}, 
	created(){
		// this.val = !!this.value;
		if (!!this.value){
			// this.toggling(); 
			// this.val = true; 
		}
		console.log('created'); 
	},
	methods: {
		
	}
}

</script>

<style scoped>
/*b.css*/
[ios-checkbox] {
	vertical-align: middle;
	display: inline-block;
}

[ios-checkbox] * {
	margin: 0; 
	padding: 0; 

	background-color: rgb(221, 221, 221); 
}

[ios-checkbox] {
	position: relative;
/*	width: 92px; 
	height: 52px; */
	width: 47px;
	height: 27px; 
	border-radius: 40px;
	/*background-color: #BBB;*/
	/*overflow: hidden;*/
}

[ios-checkbox] > .hidden-input {
	opacity: 0; 
	position: absolute;
	top: 0; 
	left: 0; 
	width: 100%;
	height: 100%; 
	z-index: 9; 
}


[ios-checkbox] .hidden-input:checked ~ .slider {
	stroke: rgb(256, 151, 146);
	stroke-width: 50px;
}

[ios-checkbox] .slider {
	stroke: #DDD;
	stroke-width: 2px;
	transition: stroke-width .3s; 
	border-radius: 50px;
}

[ios-checkbox] .circle {
	position: absolute;
	border: 1px solid #DDD; 
	left: 1px; 
	top: 1px;
	width: 25px; 
	height: 25px; 
	box-sizing: border-box;
	border-radius: 50px;
	background-color: #FFF; 
	box-shadow: 0 6px 7px -3px rgba(0, 0, 0, .4);

	transition-property: all; 
	transition-duration: .3s; 
	transition-delay: .05s; 
}

[ios-checkbox] .hidden-input:checked ~ .circle {
	left: 20px; 
}
</style>