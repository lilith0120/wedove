import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 引入组件

const router = new VueRouter({
    mode: 'history',
    base: '',
    routes: [
        {
            path: '/',
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     if (localStorage.getItem('data') == null && to.meta.needAdmin) {
//         next({
//             path: '/'
//         })
//     }
//     else if (localStorage.getItem('token')
//         || to.path == '/'
//         || to.path == '/login'
//         || to.path == '/register'
//         || to.meta.notLogin) {
//         next()
//     }
//     else {
//         next({
//             name: 'login'
//         });
//     }
// });

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router