import Vue from "vue";
import VueResource from 'vue-resource'

import VueMask from 'v-mask'

import Vuelidate from 'vuelidate'


import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from "./App.vue";
import router from "./router";

Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.use(VueMask)
Vue.use(Vuelidate)

Vue.http.options.root = 'http://127.0.0.1:3000/'
Vue.http.interceptors.push(request =>{
    request.headers.set('Auth', 'RAND TOKEN '+ Math.random())
})
Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
