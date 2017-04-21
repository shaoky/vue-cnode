import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import store from './store'
import MintUI from 'mint-ui'
import './assets/less/main.less'

import App from './app'
import vHeader from './components/header/header'
import vFooter from './components/footer/footer'

Vue.use(VueRouter)
Vue.use(MintUI)

const router = new VueRouter({
	routes,
	mode: 'history',
	base: '/mall/'
})

// 登录验证，没登录的跳转到登录页面，在router设置是否需要登录
router.beforeEach((to, from, next) => {
	if (to.meta.auth) {
		if (store.state.user.userInfo.loginname) {
			next()
		} else {
			next({
				path: '/login'
			})
		}
	} else {
		next()
	}
})

Vue.component('vHeader', vHeader)
Vue.component('vFooter', vFooter)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
