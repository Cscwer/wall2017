<template>
	<div class="gw-loading">
		<div class="spinner"></div>
	</div>
</template>

<script>

export default {
	name: 'gw-top-loading', 
	props: [],
	data(){
		return {}
	}
}
</script>

<style scoped>
.gw-loading {
	position: absolute;
	width: 100%; 
	/*height: 120px; */
	left: 0; 
	top: 0; 
	background-color: rgba(255, 255, 255, .8); 
	box-sizing: border-box;

	/*animation: onLoading .3s ease;*/
}

@keyframes onLoading {
	0% {
		transform: translateY(-100%);
	} 100% {
        transform: translateY(0%);
    }
}

@keyframes rotating {
    100% {
        transform: rotate(360deg);
    }
}

.spinner {
	margin: 3em auto; 
    border-radius: 50%;
    width: 36px;
    height: 36px;
    border: 4px solid rgba(0, 0, 0, 0.3);
    border-top: 4px solid rgba(0, 0, 0, 1);
    animation: rotating 1s infinite linear;
}
</style>
