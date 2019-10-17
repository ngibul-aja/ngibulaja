import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { firestorePlugin } from 'vuefire'
import VueBootsrap from 'bootstrap-vue'

Vue.use(VueBootsrap)

Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
