import Vue from 'vue';
import VueRouter from 'vue-router';
import Dvg from 'dvg';
import App from './app.vue';
import routes from './router.js';
Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(Dvg);
const router = new VueRouter({
  routes,
  linkActiveClass:'link-actived'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});