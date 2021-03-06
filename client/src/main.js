// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('swiper/dist/css/swiper.css');

import Vue from 'vue'
import App from './App'
// import infiniteScroll from 'vue-infinite-scroll'

import ws from '@/utils/ws.client';
import router from './router';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import GwPopup from '@/GwPopup';
import SingleWish from './components/SingleWish';
import VueDataLoading from 'vue-data-loading';



Vue.config.productionTip = false
// Vue.use(infiniteScroll);
Vue.use(VueAwesomeSwiper);


// Vue.component('gw-popup', GwPopup);


import iOSCheckbox from '@/components/ios-view/checkbox';
Vue.component('ios-checkbox', iOSCheckbox);
Vue.component('vue-data-loading', VueDataLoading);


Vue.use(GwPopup, {
	getApp: function(){
		return document.getElementById('app');
	},
	router
});

Vue.component(
	'wish',
	SingleWish
)

// history.pushState({
// 	name: '外层'
// }, '', '');
// history.pushState({
// 	name: '中层'
// }, "2", "22");

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App, swiper, swiperSlide }
})


// setTimeout(function(){
// 	var $body = document.getElementsByTagName('body')[0];
// 	console.log('OnLoad');
// 	$body.setAttribute('class', '');
// }, 200);

