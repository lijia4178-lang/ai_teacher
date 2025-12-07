// pages/my_classes/my_classes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 示例多次上课反馈（生产中应从接口获取或通过父页面传入）
    feedbacks: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 生成示例反馈数据（演示用），真实场景请替换为接口数据
    const sample = [
      {
        date: '2025-12-05T15:30:00',
        class_content: '复习分数和小数的混合运算，讲解借位除法的思路',
        student_class_status: '大部分题目能独立完成，细节计算偶有错误',
        mood: '专注'
      },
      {
        date: '2025-11-28T16:00:00',
        class_content: '英语听力训练与日常对话练习',
        student_class_status: '对话反应积极，单词拼写仍需加强',
        mood: '活泼'
      },
      {
        date: '2025-11-20T14:00:00',
        class_content: '语文阅读理解训练：把握段落主旨与逻辑关系',
        student_class_status: '能抓住中心句，但段落归纳仍有提升空间',
        mood: '安静'
      }
    ];

    // 按日期降序排列（最新在前）
    sample.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 格式化日期显示并把数据放入页面 data
    const feedbacks = sample.map(item => ({
      ...item,
      displayDate: this._formatDisplayDate(item.date)
    }));

    this.setData({ feedbacks });
  },

  _formatDisplayDate(iso) {
    const d = new Date(iso);
    const pad = n => (n < 10 ? '0' + n : n);
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})