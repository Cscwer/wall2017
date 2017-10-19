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



		<div class="toast-list" :class="'toast-pos-' + position" v-for="(position, pidx) in positions">

			<transition :name="position" v-for="(toast, idx) in toastsPosi(position)" :key="idx">
				<div v-if="toast.active" class="toast-inner"   
					:style="{
						'transition-delay': position === 'top' ?
							((toastsPosi(position).length - idx) * 0.1) + 's' :
							(idx * 0.1) + 's',
						'position': 'absolute', 
						'width': '90%', 
						'top': toast.position === 'top' ? 
							(idx * 40) + 'px' : 'none',
						'bottom': toast.position === 'bottom' ? 
							(idx * 40) + 'px' : 'none', 
						'text-align': toast.align ? 'center' : toast.align
					}">
					{{ toast.msg }}

					<span class="toast-cancel-btn" @click="toastClose(toast, position, idx)"
						v-if="toast.cancelable">
						×
					</span>
				</div>
			</transition>

		</div>
	</div>
</template>

<script>

export default {
	name: 'gw-popup', 
	data(){
		return {
			list: [
				
			],
			toasts: [
				
			],
			positions: ['top', 'bottom']
		}
	},
	created(){
 
	},
	methods: {
		toastsPosi(posi){
			let toasts = this.toasts; 
			return toasts.filter(toast => toast.position === posi); 
		},
		toastClose(selectedToast, position, idx){
			// let toasts = this.toasts; 

			// selectedToast.canceled = true; 
			// selectedToast.msg = 'afsaf'

		
			let delete_idx;

			this.toasts.forEach((toast, innerIdx) => {
				if (toast === selectedToast) delete_idx = innerIdx; 
			}); 

			this.toasts.splice(delete_idx, 1); 
		
		}
	}
}

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

.top-enter-active, .top-leave-active, .bottom-enter-active, .bottom-leave-active {
	transition: all .2s; 
}

.top-enter {
	transform: translateY(-400%);
	opacity: 0; 
}

.top-leave-to {
	transform: translateY(-400%);
	/*transition-delay: 0; */
	opacity: 0; 
}

.bottom-enter, .bottom-leave-to {
	transform: translateY(400%);
	opacity: 0; 
}

/*.toast-inner {*/
.toast-list {
	position: fixed;
	z-index: 800; 
	width: 80%; 
	left: 10%; 

	box-sizing: border-box;
}

.toast-cancel-hide {
	transition: all .3s; 
	opacity: 0; 
}

.toast-pos-bottom-moving {
	transition: all .3s; 
	transition-delay: .1s; 
	transform: translateY(40px);
}

.toast-pos-top-moving {
	transition: all .3s; 
	transition-delay: .1s; 
	transform: translateY(-40px);
}

.toast-cancel-btn {
	position: absolute;
	right: 0em; 
	width: 2.5em;
	top: 0;
	height: 20px;
	padding: 6px 0; 
	text-align: center; 
}

.toast-inner {
	transition: all .3s; 
	margin: 8px 0; 
	height: 20px;
	background-color: rgba(0, 0, 0, .6); 
	color: #FFF; 
	padding: 6px 1em;
	border-radius: 4px;
}

.toast-pos-bottom {
	bottom: 10%; 
}

.toast-text-align {
	text-align: center;
}
</style>
