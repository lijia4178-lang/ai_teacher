/*
 * @Author: lijia4178-lang lijia4178@gmail.com
 * @Date: 2025-10-18 22:11:39
 * @LastEditors: lijia4178-lang lijia4178@gmail.com
 * @LastEditTime: 2025-11-16 15:09:19
 * @FilePath: \ai_zjie\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { keys } from "mobx-miniprogram";
import { setStorage,getStorage,removeStorage,clearStorage } from "./utils/storage" 

App({   
   // 全局数据初始化
  onLaunch: function() {

    this.globalData = {
      messages: [],
      user_type: '',// 用户类型：家长或教师
      columns: [ '老师', '家长'],
      show: false,
      teachers: [
        {
          id: 1,
          name: "张老师",
          subject: "数学",
          introduction: "10年教学经验，擅长高中数学"
        },
        {
          id: 2,
          name: "李老师",
          subject: "英语",
          introduction: "海外留学背景，专注口语教学"
        },
        {
          id: 3,
          name: "王老师",
          subject: "语文",
          introduction: "资深语文教师，写作指导专家"
        }
      ]
    };


    // 加载本地缓存的聊天记录
  const messages = wx.getStorageSync('messages')
  if (messages) {
      this.globalData.messages = messages
  }
    // 加载本地缓存的用户类型
  if(wx.getStorageSync('user_type')){
      this.globalData.user_type = wx.getStorageSync('user_type')
   }else{
      wx.setStorageSync('user_type','')
      this.showPopup()
  };
  },  
  showPopup: function() {
    // App 实例没有 setData，不能直接操作视图层数据。
    // 将弹窗状态放到 globalData 中，页面需要通过 getApp().globalData.show 来读取并自行渲染弹窗。
    this.globalData.show = true;
  },

  onClose: function() {
    // 关闭弹窗同样设置 globalData
    this.globalData.show = false;
  },
    
  onChange: function (e) {
    const { picker, value, index } = e.detail || {};
    // 避免使用未导入的第三方 Toast，使用微信原生的 wx.showToast 显示信息
    wx.showToast({ title: `当前值：${value}, 当前索引：${index}`, icon: 'none' });
  },
  // 保存聊天记录到本地缓存
  saveMessages: function(messages) {
    wx.setStorageSync('messages', messages)
  },
     /**
// * 将 ArrayBuffer 转换为十六进制字符串
// * @param {ArrayBuffer} buffer - 待转换的 ArrayBuffer
// * @returns {string} - 转换后的十六进制字符串
// */
  buf2hex: function(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('')
  },

// /**
// * 将十六进制字符串转换为普通字符串
// * @param {string} hex - 十六进制字符串
// * @returns {string} - 转换后的普通字符串
// */
  hexToStr: function(hex) {
    let str = ''
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
    }
    return str
 }
    
})