import Vue from 'vue';
import VueRouter from 'vue-router';
import Vag from 'vag';
import App from './app.vue';
import routes from './router.js';
Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(Vag);
const router = new VueRouter({
  routes,
  linkActiveClass:'link-actived'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});