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
                    component: addShop,
                    meta:['添加数据','添加商铺']
                },
                {
                    path: '/addGoods',
                    component: addGoods,
                    meta:['添加数据','添加商品']
                },
                {
                    path: '/shopList',
                    component: shopList,
                    meta:['数据管理','商铺列表']
                },
                {
                    path: '/foodList',
                    component: foodList,
                    meta:['数据管理','食品列表']
                },
                {
                    path: '/orderList',
                    component: orderList,
                    meta:['数据管理','订单列表']
                },
                {
                    path: '/adminList',
                    component: adminList,
                    meta:['数据管理','管理员列表']
                },
                {
                    path: '/userList',
                    component: userList,
                    meta:['数据管理','用户列表']
                },
                {
                    path: '/visitor',
                    component: visitor,
                    meta:['图表','用户分布']
                },
                {
                    path: '/vueEdit',
                    component: vueEdit,
                    meta:['文本编辑器','MarkDown']
                },
                {
                    path: '/adminSet',
                    component: adminSet,
                    meta:['设置','管理员设置']
                },
            ]
        }
    ]
})
