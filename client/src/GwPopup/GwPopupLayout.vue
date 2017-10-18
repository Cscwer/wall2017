<template>
	<div class="gw-popup">
		<div class="compo-list" v-for="(popupItem, idx) in list">
			
			<transition name="fade">
				<div class="gw-outter" v-if="popupItem.isShow && popupItem.type === 'alert'"
					:style="{ 'z-index': 500 + idx }">
					<gw-alert class="popup-item"
						:confirm-text="popupItem.confirmText"
						:cancel-text="popupItem.cancelText"
						@confirm="popupItem.handle.confirm"
						@cancel="popupItem.handle.cancel">
					</gw-alert>
				</div>
			</transition>

			
			<transition name="fade">
				<div class="gw-outter" v-if="popupItem.isShow && popupItem.type === 'confirm'"
					:style="{ 'z-index': 500 + idx }">
					<gw-confirm class="popup-item"
						:confirm-text="popupItem.confirmText"
						@confirm="popupItem.handle.confirm"
						@cancel="popupItem.handle.cancel">
					</gw-confirm>
				</div>
			</transition>

			<transition name="fade">
				<div class="gw-outter" v-if="popupItem.isShow && popupItem.type === 'prompt'"
					:style="{ 'z-index': 500 + idx }">
					<gw-prompt class="popup-item"
						:confirm-text="popupItem.confirmText"
						:placeholder-text="popupItem.placeholderText"
						@confirm="popupItem.handle.confirm"
						@cancel="popupItem.handle.cancel">
					</gw-prompt>
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
