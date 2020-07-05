import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'

Vue.use(VueRouter)

// 引入组件
const home = () => import('../components/Home/Home')
const register = () => import('../components/Register/Register')
const forget = () => import('../components/Forget_pswd/Forget')

const router = new VueRouter({
    mode: 'history',
    base: '',
    routes: [
        {
            path: '/',
            component: home,
            name: 'home'
        },
        {
            path: '/register',
            component: register,
            name: 'register'
        },
        {
            path: '/forget',
            component: forget,
            name: 'forget'
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (store.state.token != ""
        || to.path == '/'
        || to.path == '/register'
        || to.path == '/forget') {
        next()
    }
    else {
        next({
            name: 'home'
        });
    }
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router