<template>
	<div class="gw-popup">
		<div class="compo-list" v-for="(popupItem, idx) in list">
			<transition name="fade">
				<div class="gw-outter" v-if="popupItem.isShow"
					:style="{ 'z-index': 500 + idx }">
					<component class="popup-item" :is="'gw-' + popupItem.type"
						v-bind="popupItem"
						v-on="popupItem.handle">
					</component>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>

let PopupComponent = {
	name: 'gw-popup', 
	data(){
		return {
			list: [
				
			]
		}
	},
	created(){
 
	},
	methods: {

	}
}

export default PopupComponent; 

</script>



<style>
.gw-outter {
	position: fixed;
	top: 0;
	left: 0; 
	width: 100%; 
	height: 100%; 

	/*z-index: 500; */
}

.popup-item, .gw-outter {
	transition: all .3s; 
}

.fade-enter-active, .fade-leave-active {
	transition: all .2s; 
}

/* .fade-leave-active in below version 2.1.8 */ 
.fade-enter, .fade-leave-to {
	transform: scale(1.5);
	opacity: 0; 
}
</style>
