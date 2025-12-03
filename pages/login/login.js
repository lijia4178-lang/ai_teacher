// pages/login/login.js
import { login} from "../../api/user"
import { setStorage } from "../../utils/storage"
import { ComponentWithStore } from "mobx-miniprogram-bindings"
import { userStore } from "../../stores/userstore" 


ComponentWithStore({
  // 让页面与store对象进行绑定
  storeBindings: {
    store: userStore,
    fields: ['token'],
    actions: {
      setToken: 'setToken'
    }
  },
  // 授权登录
   methods : {
    login(){
    wx.login({
      success:  async({code}) => {
        if(code){
         const {data} = await login(code)
         setStorage('token', data.token)
         this.setToken(data.token)
        }else{
          wx.showToast({
            title: '登录失败',
            icon: 'none'
          })
        }
      }
    })
  }},
  handle:function(){
     res = wx.request({
      url: config.BaseURL + '/health',
      method: 'get',
      data: {
      },
      success: (res) => {
        console.log(res)
      },
      fail: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log('complete')
      }
    })

  }
})