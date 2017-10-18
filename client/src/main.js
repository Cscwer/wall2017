// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import infiniteScroll from 'vue-infinite-scroll'
import router from './router'

// import GwPopup from '@/components/global/GwPopup'
// import GwAlert from '@/components/global/GwAlert'

import GwPopup from '@/GwPopup'; 


Vue.config.productionTip = false
Vue.use(infiniteScroll); 
// Vue.component('gw-popup', GwPopup);



Vue.use(GwPopup, {
	getApp: function(){
		return document.getElementById('app'); 
	}
}); 


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})
