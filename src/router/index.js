import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
/**
 * auth = true 则需要登录
 */
const routers = [
	{
		path: '/index.html',	// 此路由供线上,二级目录使用
		name: 'mall',
		component: (resovle) => {
			require(['../views/index/list.vue'], resovle)
		}
	},
	{
		path: '/community',	// 此路由供线上,二级目录使用
		name: 'community',
		component: (resovle) => {
			require(['../views/index/list.vue'], resovle)
		}
	},
	{
		path: '/',
		name: 'index',
		component: (resovle) => {
			require(['../views/index/list.vue'], resovle)
		}
	},
	{
		path: '/index',
		name: 'list',
		component: (resovle) => {
			require(['../views/index/list.vue'], resovle)
		}
	},
	{
		path: '/topic/:id',
		name: 'topic',
		component: (resovle) => {
			require(['../views/topic/index.vue'], resovle)
		}
	},
	{
		path: '/about',
		name: 'about',
		component: (resovle) => {
			require(['../views/about/index.vue'], resovle)
		}
	},
	{
		path: '/user/:loginname',
		name: 'user',
		component: (resovle) => {
			require(['../views/user/index.vue'], resovle)
		}
	},
	{
		path: '/login',
		name: 'login',
		component: (resovle) => {
			require(['../views/login/index.vue'], resovle)
		}
	},
	{
		path: '/home',
		name: 'home',
		component: (resovle) => {
			require(['../views/home/index.vue'], resovle)
		}
	},
	{
		path: '/home/publish',
		name: 'publish',
		meta: { auth: true },
		component: (resovle) => {
			require(['../views/home/publish.vue'], resovle)
		}
	},
	{
		path: '/home/message',
		name: 'message',
		meta: { auth: true },
		component: (resovle) => {
			require(['../views/home/message.vue'], resovle)
		}
	},
	{
		path: '/home/collect',
		name: 'collect',
		meta: { auth: true },
		component: (resovle) => {
			require(['../views/home/collect.vue'], resovle)
		}
	},
	{
		path: '*',
		name: '404',
		component: (resovle) => {
			require(['../views/stsyem/404.vue'], resovle)
		}
	}
]

export default routers
