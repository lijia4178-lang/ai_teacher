import WxRequest from 'mina-request' ;
import config from '../config/config';

// 对类进行实例化
const instance = new WxRequest({
    baseURL: config.BaseURL, // 替换为你的基础URL,
    timeout: config.timeout, // 请求超时时间，单位为毫秒
    headers: config.headers,
});
// 可以添加请求拦截器
instance.interceptors.request = (config) => {
    // 访问token
    const token = wx.getStorageSync('token');
    if (token) {
        config.headers['token'] = token;
    }
     return config };
// 可以添加响应拦截器
instance.interceptors.response = (response) => {
     return response };




export default instance;