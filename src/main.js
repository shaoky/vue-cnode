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
	scrollBehavior (to, from, savedPosition) {
		console.log('to', to)
		// 如果你的連結是帶 # 這種
		// to.hash 就會有值(值就是連結)
		// 例如 #3
		if (to.hash) {
			return {
				// 這個是透過 to.hash 的值來找到對應的元素
				// 照你的 html 來看是不用多加處理這樣就可以了
				// 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
				selector: to.hash
			}
		}
	}
})

Vue.component('vHeader', vHeader)
Vue.component('vFooter', vFooter)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
