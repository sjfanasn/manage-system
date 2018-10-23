import axios from 'axios';
const baseUri = "http://elm.cangdu.org";
import { isGet } from './isGet.js'; // 拼串
export const login = data => axios({
    method: 'post',
    url: baseUri + '/admin/login',
    data: data
});
export const getAdminInfo = () => axios(baseUri + '/admin/info');
export const getUserList = data => axios({
    method: 'get',
    url: isGet(baseUri + '/v1/users/list', data)
});
export const getUserCount = () => axios(baseUri + '/v1/users/count');