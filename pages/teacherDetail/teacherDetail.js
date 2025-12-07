// pages/teacherDetail/teacherDetail.js
Page({
  data: {
    teacher: null
  },

  onLoad: function(options) {
    // 支持两种跳转来源：
    // 1) 直接传入 teacher（老方式）
    // 2) 只传入 teacherId（推荐），从 app.globalData.teachers 中查找对应老师
    const app = getApp();
    if (options.teacher) {
      try {
        const teacher = JSON.parse(options.teacher);
        this.setData({ teacher });
        return;
      } catch (e) {
        console.warn('解析传入的 teacher 失败', e);
      }
    }

    if (options.teacherId) {
      const teacherId = decodeURIComponent(options.teacherId);
      const list = (app && app.globalData && app.globalData.teachers) || [];
      const teacher = list.find(t => String(t.id) === String(teacherId));
      if (teacher) {
        this.setData({ teacher });
      } else {
        // 若找不到，可在此处调用接口获取详情
        console.warn('未找到 teacherId 对应的数据，请通过接口获取详情', teacherId);
      }
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