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
	mode: 'history',
	routes
})

Vue.component('vHeader', vHeader)
Vue.component('vFooter', vFooter)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
