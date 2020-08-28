import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store/store'

Vue.use(VueRouter)

// 引入组件
const home = () => import('../components/Home/Home')
const home_page = () => import('../components/Home/Home_page')
const main_page = () => import('../components/Home/Content/Main_page')
const favorite_page = () => import('../components/Home/Content/Favorite_page')
const praised_page = () => import('../components/Home/Content/Praised_page')

const register = () => import('../components/Register/Register')
const forget = () => import('../components/Forget_pswd/Forget')

const setting = () => import('../components/Setting_self/Setting')
const change_msg = () => import('../components/Setting_self/Change_msg')
const change_avatar = () => import('../components/Setting_self/Change_avatar')
const change_pswd = () => import('../components/Setting_self/Change_pswd')

const myhome = () => import('../components/Myhome/Myhome')
const myhome_page = () => import('../components/Myhome/Myhome_page')
const my_main_page = () => import('../components/Myhome/Content/Main_page')
const attention_page = () => import('../components/Myhome/Content/Attention_page')
const fan_page = () => import('../components/Myhome/Content/Fan_page')

const router = new VueRouter({
    mode: 'history',
    base: '',
    routes: [
        {
            path: '/',
            component: home,
            name: 'home',
            redirect: { name: 'home_page' },
            children: [
                {
                    path: 'home',
                    component: home_page,
                    name: 'home_page',
                    redirect: { name: 'main_page' },
                    children: [
                        {
                            path: 'main',
                            component: main_page,
                            name: 'main_page'
                        },
                        {
                            path: 'favorite',
                            component: favorite_page,
                            name: 'favorite_page'
                        },
                        {
                            path: 'praised',
                            component: praised_page,
                            name: 'praised_page'
                        },
                    ]
                },
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
        },
        {
            path: '/myhome/:user',
            component: myhome,
            name: 'myhome',
            redirect: { name: 'myhome_page' },
            children: [
                {
                    path: '',
                    component: myhome_page,
                    name: 'myhome_page',
                    redirect: { name: 'my_main_page' },
                    children: [
                        {
                            path: 'blogs',
                            component: my_main_page,
                            name: 'my_main_page'
                        },
                        {
                            path: 'attention',
                            component: attention_page,
                            name: 'attention_page'
                        },
                        {
                            path: 'fan',
                            component: fan_page,
                            name: 'fan_page'
                        }
                    ]
                },
            ]
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