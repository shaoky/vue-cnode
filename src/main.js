import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import App from './app'
import store from './store'
import MintUI from 'mint-ui'

Vue.use(VueRouter)
Vue.use(MintUI)

const router = new VueRouter({
	mode: 'history',
	routes
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
