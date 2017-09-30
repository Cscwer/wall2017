import Vue from 'vue'
import Router from 'vue-router'
import Wall from '@/components/Wall'
import Music from '@/components/Music'
import Wish from '@/components/Wish'
import Love from '@/components/Love'
import Me from '@/components/Me'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/wall'
		}, 
		{
			path: '/wall', 
			name: 'Wall',
			component: Wall
		},
		{
			path: '/music',
			name: 'Music',
			component: Music
		},
		{
			path: '/wish',
			name: 'Wish',
			component: Wish
		}, 
		{
			path: '/love',
			name: 'Love',
			component: Love
		}, 
		{
			path: '/me', 
			name: 'Me', 
			component: Me
		}
	]
})
