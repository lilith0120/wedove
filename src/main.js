import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css'
import axios from 'axios'

// axios.defaults.baseURL = 'http://yjcxlr.cn:3000/'

// 请求拦截 
// axios.interceptors.request.use(
//   config => {
//     let url = config.url.split('=')[0];
//     if (config.url == "/api/users/login"
//       || config.url == "/api/users/register"
//       || url == "/api/users/utils/emailCode?email") {
//       return config;
//     }
//     else {
//       config.headers.Authorization = localStorage.getItem("token");
//     }

//     return config;
//   },
//   err => {
//     Promise.reject(err)
//   }
// );



// 响应拦截
// axios.interceptors.response.use(response => {
//   return response;
// }, error => {
//   if (error.response) {
//     switch (error.response.status) {
//       case 401:
//         localStorage.removeItem('token')
//         localStorage.removeItem('id')
//         localStorage.removeItem('files')
//         localStorage.removeItem('data')
//         router.replace({
//           path: 'login',
//         });
//         break;
//       case 500:
//         localStorage.removeItem('token')
//         localStorage.removeItem('id')
//         localStorage.removeItem('files')
//         localStorage.removeItem('data')
//         router.replace({
//           path: 'login',
//         })
//     }
//   }
//   return Promise.reject(error.response.data)
// });
Vue.prototype.$axios = axios

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
