/*
 * @Author: lijia4178-lang lijia4178@gmail.com
 * @Date: 2025-11-10 22:30:18
 * @LastEditors: lijia4178-lang lijia4178@gmail.com
 * @LastEditTime: 2025-11-10 22:32:43
 * @FilePath: \ai_zjie\stores\userstores.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { action} from 'mobx-miniprogram';
import {observable} from 'mobx-miniprogram';
import { getStorage } from '../utils/storage';
export const userStore = observable({
    // 定义响应式数据
  token: getStorage('token') || '',

    // 定义修改数据的方法
    // 定义action方法
  setToken: action(function(token) {
    // 在调用该方法时传入token赋值
    this.token = token
    })

});