// pages/my/my.js
Page({
  data: {
    studyPlans: [], // 学习方案列表
    isLoading: true, // 加载状态
    userInfo: {} // 用户信息
  },
  
  onLoad: function() {
    // 加载学习方案数据
    this.loadStudyPlans();
    
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

  // 加载学习方案数据
  loadStudyPlans: function() {
    // 模拟从存储中获取数据
    try {
      const plans = wx.getStorageSync('studyPlans') || [];
      this.setData({
        studyPlans: plans,
        isLoading: false
      });
    } catch (e) {
      console.error('获取学习方案失败:', e);
      this.setData({
        isLoading: false
      });
      // 如果获取失败，使用模拟数据
      this.setMockStudyPlans();
    }
  },

  // 设置模拟学习方案数据
  setMockStudyPlans: function() {
    const mockPlans = [
      {
        id: '1',
        title: '高三数学复习计划',
        subject: '数学',
        startTime: '2024-10-01',
        endTime: '2024-12-31',
        progress: 65,
        status: '进行中',
        teacherName: '张老师',
        totalHours: 80,
        completedHours: 52
      },
      {
        id: '2',
        title: '英语听力提升计划',
        subject: '英语',
        startTime: '2024-09-15',
        endTime: '2024-11-15',
        progress: 100,
        status: '已完成',
        teacherName: '李老师',
        totalHours: 40,
        completedHours: 40
      },
      {
        id: '3',
        title: '物理基础巩固',
        subject: '物理',
        startTime: '2024-10-10',
        endTime: '2025-01-10',
        progress: 25,
        status: '进行中',
        teacherName: '王老师',
        totalHours: 60,
        completedHours: 15
      }
    ];

    this.setData({
      studyPlans: mockPlans
    });
  },

  // 查看学习方案详情
  viewStudyPlanDetail: function(e) {
    const planId = e.currentTarget.dataset.id;
    const plan = this.data.studyPlans.find(p => p.id === planId);
    
    if (plan) {
      wx.navigateTo({
        url: `/pages/studyPlanDetail/studyPlanDetail?plan=${encodeURIComponent(JSON.stringify(plan))}`
      });
    }
  },

  // 添加新的学习方案
  addNewStudyPlan: function() {
    wx.navigateTo({
      url: '/pages/addStudyPlan/addStudyPlan'
    });
  },

  // 清除聊天记录
  clearChatHistory: function() {
    const that = this
    wx.showModal({
      title: '提示',
      content: '确定要清除所有聊天记录吗？',
      success: function(res) {
        if (res.confirm) {
          // 清除全局数据中的聊天记录
          const app = getApp()
          app.globalData.messages = []
          
          // 清除本地缓存
          wx.removeStorageSync('messages')
          
          wx.showToast({
            title: '清除成功',
            icon: 'success'
          })
        }
      }
    })
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

  // 设置
  settings: function() {
    wx.showModal({
      title: '设置',
      content: '设置功能正在开发中...',
      showCancel: false,
      confirmText: '确定'
    })
  },

  // 页面显示时刷新数据
  onShow: function() {
    // 重新加载学习方案数据，确保最新的数据显示
    if (this.data.isLoading === false) {
      this.loadStudyPlans();
    }
  }
})