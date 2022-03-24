// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import './assets/css/reset.css';
import './assets/css/common.css';
import _ from 'lodash';
import VueI18n from 'vue-i18n';
import en from '@/language/en';
import cn from '@/language/zh-cn';
import "@babel/polyfill";
import VConsole from "vconsole";
import './assets/js/tagcanvas.min.js';

const debug = process.env.NODE_ENV != 'production';
if (debug) {
    const vConsole = new VConsole();
}

Vue.config.productionTip = false;

import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);

/* 引入axios */
import Axios from './http/axios';
Vue.prototype.$http = Axios;

// 全局引入 lodash
Vue.prototype._ = _;

// 引入国际化
Vue.use(VueI18n);

const messages = {
  en,
  cn
}

const i18n = new VueI18n({
  locale: 'cn', // set locale
  messages, // set locale messages
})

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
