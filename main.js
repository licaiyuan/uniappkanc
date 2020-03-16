import Vue from 'vue'
import App from './App'
import * as API from './api/http'
Vue.prototype.$api = API

Vue.config.productionTip = false
import store from './store'
import {tcts} from './pages/index/common.js'
Vue.prototype.$store = store
Vue.prototype.$tcts = tcts
Vue.prototype.$EvenBus = new Vue()
App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
