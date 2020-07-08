import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store/store'

Vue.use(VueRouter)

// 引入组件
const home = () => import('../components/Home/Home')
const register = () => import('../components/Register/Register')
const forget = () => import('../components/Forget_pswd/Forget')
const setting = () => import('../components/Setting_self/Setting')
const change_msg = () => import('../components/Setting_self/Change_msg')
const change_avatar = () => import('../components/Setting_self/Change_avatar')
const change_pswd = () => import('../components/Setting_self/Change_pswd')

const router = new VueRouter({
    mode: 'history',
    base: '',
    routes: [
        {
            path: '/',
            component: home,
            name: 'home',
            children: [
                {
                    path: 'setting',
                    component: setting,
                    name: 'setting',
                    redirect: { name: 'change_msg' },
                    children: [
                        {
                            path: 'message',
                            component: change_msg,
                            name: 'change_msg'
                        },
                        {
                            path: 'avatar',
                            component: change_avatar,
                            name: 'change_avatar'
                        },
                        {
                            path: 'pswd',
                            component: change_pswd,
                            name: 'change_pswd'
                        }
                    ]
                }
            ]
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

// router.beforeEach((to, from, next) => {
//     if (store.state.token != ""
//         || to.path == '/'
//         || to.path == '/register'
//         || to.path == '/forget') {
//         next()
//     }
//     else {
//         next({
//             name: 'home'
//         });
//     }
// });

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router