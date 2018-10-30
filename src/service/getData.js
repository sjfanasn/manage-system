import axios from 'axios';
// const baseUri = "http://localhost:8002";
const baseUri = "https://elm.cangdu.org";
import { isGet } from './isGet.js'; // 拼串

/**
 * 登录
 */
export const login = data => axios({
    method: 'post',
    url: baseUri + '/admin/login',
    data: data
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
 * 获取定位城市
*/
export const cityGuess = () => axios({
    method: 'get',
    url: isGet(baseUri + '/v1/cities', {
        type: 'guess'
    })
});

/**
 * 食物类别 
 */

export const shopEdit = () => axios(baseUri + '/shopping/v2/restaurant/category');

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