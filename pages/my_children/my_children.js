// pages/my_children/my_children.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    children:{
      "child_name": "张小明",
      "child_age": 8,
      "child_gender": "男",
      "child_sort": "小学生",
      "child_study_habit": "每天放学后先完成作业，再预习第二天的课程，周末会复习一周所学内容。",
      "child_study_features": "对数学有浓厚兴趣，喜欢解决实际问题，但在语文阅读理解方面需要加强。",
      "child_study_perform": "数学成绩优秀，语文成绩良好，英语成绩中等。",
      "child_physical_develop": "身高130厘米，体重25公斤，喜欢户外运动，如踢足球和跑步。",
      "child_cognitive_develop": "能够进行简单的逻辑推理，对时间、空间的概念有较好的理解。",
      "child_language_develop": "普通话发音标准，能够流利表达自己的想法，词汇量约为2000个。",
      "child_social_emotions": "性格开朗，喜欢与同龄人交往，能够遵守游戏规则，与同学相处融洽。",
      "child_behavioral_habits": "早睡早起，每天保证9小时睡眠，能够自己整理书包和房间。",
      "child_creativity_and_aesthetics": "喜欢画画，经常用彩笔描绘想象中的世界，对音乐节奏敏感，喜欢唱歌。",
      "child_morality_and_values": "懂得尊重长辈，关心同学，诚实守信，具有初步的环保意识。"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 将 children 对象映射为便于模板循环的 sections 数组
    const c = this.data.children || {};
    const sections = [
      { title: '学习习惯', content: c.child_study_habit || '' },
      { title: '学习特点', content: c.child_study_features || '' },
      { title: '学习表现', content: c.child_study_perform || '' },
      { title: '身体发育', content: c.child_physical_develop || '' },
      { title: '认知发展', content: c.child_cognitive_develop || '' },
      { title: '语言发展', content: c.child_language_develop || '' },
      { title: '社会与情感', content: c.child_social_emotions || '' },
      { title: '行为习惯', content: c.child_behavioral_habits || '' },
      { title: '创造力与审美', content: c.child_creativity_and_aesthetics || '' },
      { title: '品德与价值观', content: c.child_morality_and_values || '' }
    ];
    this.setData({ sections });
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