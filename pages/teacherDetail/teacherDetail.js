// pages/teacherDetail/teacherDetail.js
Page({
  data: {
    teacher: null
  },

  onLoad: function(options) {
    // 接收从上一个页面传来的老师信息
    if (options.teacher) {
      const teacher = JSON.parse(options.teacher)
      this.setData({
        teacher: teacher
      })
    }
  },
  onTabItemTap(item) {
    console.log('tab clicked', item)
  },

  // 联系老师功能
  contactTeacher: function() {
    const { teacher } = this.data
    wx.showModal({
      title: '联系老师',
      content: `您确定要联系 ${teacher.name} 老师吗？我们将为您安排后续沟通。`,
      showCancel: true,
      cancelText: '暂不联系',
      confirmText: '确定联系',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '已提交联系申请',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },

  // 返回上一页
  goBack: function() {
    wx.navigateBack()
  }
})