// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import infiniteScroll from 'vue-infinite-scroll'
import router from './router';
import VueAwesomeSwiper from 'vue-awesome-swiper';

// import GwPopup from '@/components/global/GwPopup'
// import GwAlert from '@/components/global/GwAlert'

import GwPopup from '@/GwPopup';


Vue.config.productionTip = false
Vue.use(infiniteScroll);
Vue.use(VueAwesomeSwiper);
// Vue.component('gw-popup', GwPopup);



Vue.use(GwPopup, {
	getApp: function(){
		return document.getElementById('app');
	},
	router
});


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})
