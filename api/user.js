import https from '../utils/http';
/*
 * @Author: lijia4178-lang
    * @Date: 2025-11-10 19:27:21
 * @LastEditors: lijia4178-lang lijia4178@gmail.com
 * @LastEditTime: 2025-11-10 23:45:11
    * @FilePath: \ai_zjie\api\user.js
    * @Description: 用户相关API封装
 */
// 用户登录接口
export const login = (token) => {
    return https.get('/user/login', { token })
}
// 获取用户信息接口

export const getUserInfo = () => {
    return https.get('/user/info')
}