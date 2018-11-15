import axios from 'axios';
import Vue from 'vue';
axios.defaults.withCredentials = true;//让ajax携带cookie
// Vue.prototype.$axios = axios;
// const baseUri = "http://localhost:8002";
export const baseUri = "https://elm.cangdu.org";
export const baseUriImage = "https://elm.cangdu.org/img/";
import { isGet } from './isGet.js'; // 拼串
/**
 * 登录
 */
export const login = data => axios({
    method: 'post',
    mode: 'no-cors',
    url: baseUri + '/admin/login',
    data: data,
    withCredentials: true
});

/**
 * 用户信息
 */
export const getAdminInfo = () => axios(baseUri + '/admin/info');

/**
 * 用户列表
 */

export const getUserList = data => axios({
    method: 'get',
    url: isGet(baseUri + '/v1/users/list', data)
});

/** 
 * 商店列表
*/
export const getShoplist = (data) => axios({
    method: 'get',
    url: isGet(baseUri + '/shopping/restaurants', data)
});

/** 
 * 用户数量
*/
export const getUserCount = () => axios(baseUri + '/v1/users/count');

/** 
 * 店铺数量
*/
export const getShopCount = () => axios(baseUri + '/shopping/restaurants/count');
/**
 * 获取订单数量
 */
export const getOrderCount = () => axios(baseUri + '/bos/orders/count')
/** 
 * 获取定位城市
*/
export const cityGuess = () => axios({
    method: 'get',
    url: isGet(baseUri + '/v1/cities', {
        type: 'guess'
    })
});

/**
 * 修改商铺
 */

export const editShop = (data) => axios({
    method: 'post',
    url: baseUri + '/shopping/updateshop',
    data: data
});

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => axios({
    method: 'get',
    url: isGet(baseUri + '/v1/pois', {
        type: 'search',
        city_id: cityid,
        keyword: value
    })
});
/***
 * 食物分类
 */
export const foodCategory = () => axios(baseUri + '/shopping/v2/restaurant/category');
/**
 * 添加店铺
 */
export const addShop = (data) => axios({
    method: 'post',
    url: baseUri + '/shopping/addShop',
    data: data
});

/**
 *登出
 */
export const signout = () => axios(baseUri + '/admin/singout');
/**
 * 用户注册量
 */
export const userCount = date => axios(baseUri + '/statis/user/' + date + '/count');
/**
 * 某一天订单数量
 */
export const orderCount = date => axios(baseUri + '/statis/order/' + date + '/count');
/**
 * 某一天管理员注册量
 */
export const adminDayCount = date => axios(baseUri + '/statis/admin/' + date + '/count');
/**
 * 管理员数量
 */
export const adminCount = () => axios(baseUri + '/admin/count');

// 添加食品，当前店铺食品种类
export const getCategory = restaurant_id => axios(baseUri + '/shopping/getcategory/' + restaurant_id);
// 添加食品，添加食品种类
export const addCategory = data => axios({
    method: "post",
    url: baseUri + '/shopping/addcategory',
    data: data
})

// 添加食品
export const addFood = data => axios({
    method: "post",
    url: baseUri + '/shopping/addfood',
    data:data
})