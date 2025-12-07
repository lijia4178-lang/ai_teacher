// pages/my/my.js
Page({
  data: {
    studyPlans: [], // 学习方案列表
    isLoading: true, // 加载状态
    userInfo: {} // 用户信息
  },
  
  onLoad: function() {

    
    // 尝试获取用户信息
    this.getUserInfo();
  },
  onTabItemTap(item) {
  console.log('tab clicked', item)
  },
  
  // 获取用户信息
  getUserInfo: function() {
    try {
      // 尝试从本地存储获取用户信息
      const userInfo = wx.getStorageSync('userInfo') || {};
      this.setData({
        userInfo: userInfo
      });
    } catch (e) {
      console.error('获取用户信息失败:', e);
    }
  },
  
  // 获取用户头像、昵称等基本信息
  getUserProfile: function() {
    const that = this;
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: function(res) {
        const userInfo = res.userInfo;
        
        // 获取openid和unionid（需要服务端配合）
        // 这里模拟获取openid
        userInfo.openId = 'mock_openid_' + Date.now();
        
        // 保存到本地存储
        wx.setStorageSync('userInfo', userInfo);
        
        that.setData({
          userInfo: userInfo
        });
        
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
      },
      fail: function(err) {
        console.error('获取用户信息失败:', err);
        wx.showToast({
          title: '获取信息失败',
          icon: 'none'
        });
      }
    });
  },
  
  // 获取用户手机号
  getPhoneNumber: function(e) {
    const that = this;
    
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      // 注意：这里需要服务端配合解密手机号
      // 以下是模拟获取到手机号的情况
      
      // 获取当前用户信息
      const userInfo = this.data.userInfo;
      userInfo.phoneNumber = '138****6789'; // 模拟手机号
      
      // 保存到本地存储
      wx.setStorageSync('userInfo', userInfo);
      
      that.setData({
        userInfo: userInfo
      });
      
      wx.showToast({
        title: '获取手机号成功',
        icon: 'success'
      });
      
      // 实际开发中，这里应该将encryptedData和iv发送到服务端解密
      /*
      wx.request({
        url: 'https://your-server.com/api/decryptPhone',
        method: 'POST',
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        },
        success: function(res) {
          // 处理服务端返回的手机号
        }
      });
      */
    }
  },


  // 关于我们
  aboutUs: function() {
    wx.showModal({
      title: '关于我们',
      content: 'AI助教小程序\n版本：1.0.0\n\n我们致力于为学生提供智能化的学习辅助工具，帮助学生更好地学习和成长。',
      showCancel: false,
      confirmText: '确定'
    })
  },

  // 意见反馈
  feedback: function() {
    wx.showModal({
      title: '意见反馈',
      content: '感谢您的使用！如有任何意见或建议，请发送邮件至：feedback@aiteacher.com',
      showCancel: false,
      confirmText: '确定'
    })
  },
toMyChildren: function(){
  wx.navigateTo({
    url: '/pages/my_children/my_children'
  })
},
toMyTeacher: function(){
  wx.navigateTo({
    url: '/pages/my_teacher/my_teacher'
  })

},
toMyClasses:function(){
  wx.navigateTo({
    url: '/pages/my_classes/my_classes'
  })


},




 

  // 页面显示时刷新数据
  onShow: function() {

  }
})