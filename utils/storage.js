/*
 * @Author: lijia4178-lang lijia4178@gmail.com
 * @Date: 2025-11-10 19:11:17
 * @LastEditors: lijia4178-lang lijia4178@gmail.com
 * @LastEditTime: 2025-11-10 21:26:44
 * @FilePath: \ai_zjie\utils\storage.js
 * @Description: 本地存储封装
 */

export const setStorage = (key, value) => {
    try {
        wx.setStorageSync(key, value)
    } catch (e) {
        console.error(`存储指定键值对${key}时出错`, e)
    }
}
// 获得数据从本地存储
export const getStorage = (key) => {try {
        wx.getStorageSync(key)
    } catch (e) {
        console.error(`获取指定键值${key}时出错`, e)
    }
}
// 移除数据从本地存储
export const removeStorage = (key) => {

    wx.removeStorageSync(key)
}
// 清除所有本地存储
export const clearStorage = () =>  {   
    try {
        wx.clearStorageSync()
    } catch (e) {
        console.error(`清除所有本地存储时出错`, e)
    }
}
