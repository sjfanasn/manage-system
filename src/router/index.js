import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/manage',
            component: manage,
            name: '',
            children: [
                {
                    path: '',
                    component: home,
                },
                {
                    path: '/addShop',
                    component: addShop
                },
                {
                    path: '/addGoods',
                    component: addGoods
                },
                {
                    path: '/shopList',
                    component: shopList
                },
                {
                    path: '/foodList',
                    component: foodList
                },
                {
                    path: '/orderList',
                    component: orderList
                },
                {
                    path: '/adminList',
                    component: adminList
                },
                {
                    path: '/userList',
                    component: userList
                },
                {
                    path: '/visitor',
                    component: visitor
                },
                {
                    path: '/vueEdit',
                    component: vueEdit
                },
                {
                    path: '/adminSet',
                    component: adminSet
                },
            ]
        }
    ]
})
