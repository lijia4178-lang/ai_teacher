// pages/teacherList/teacherList.js
Page({
  data: {
    teachers: [],
    filteredTeachers: [],
    subjectOptions: ['全部', '语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
    experienceOptions: [
      { label: '全部', value: 'all' },
      { label: '1-3年', value: '1-3' },
      { label: '3-5年', value: '3-5' },
      { label: '5-10年', value: '5-10' },
      { label: '10年以上', value: '10+' }
    ],
    priceOptions: [
      { label: '全部', value: 'all' },
      { label: '100元以下', value: '0-100' },
      { label: '100-200元', value: '100-200' },
      { label: '200-300元', value: '200-300' },
      { label: '300-500元', value: '300-500' },
      { label: '500元以上', value: '500+' }
    ],
    selectedSubject: '全部',
    selectedExperience: 'all',
    selectedPrice: 'all'
  },

  onLoad: function() {
    const app = getApp();
    const teachers = app.globalData.teachers || [];
    
    const useMockData = teachers.length === 0 || 
                      (teachers.length > 0 && (!('experience' in teachers[0]) || !('price' in teachers[0])));
    
    if (useMockData) {
      this.setMockTeachers();
    } else {
      this.setData({
        teachers: teachers,
        filteredTeachers: teachers
      });
    }
  },
  onTabItemTap(item) {
    console.log('tab clicked', item)
  },

  setMockTeachers: function() {
    const mockTeachers = [
      { id: '1', name: '张老师', subject: '数学', experience: 16, price: 400, introduction: '资深数学教师，有丰富的教学经验' },
      { id: '2', name: '李老师', subject: '英语', experience: 7, price: 310, introduction: '专注英语教学，善于激发学生兴趣' },
      { id: '3', name: '王老师', subject: '物理', experience: 12, price: 330, introduction: '物理教学专家，深入浅出' },
      { id: '4', name: '刘老师', subject: '语文', experience: 5, price: 280, introduction: '语文教学骨干，重视阅读理解' },
      { id: '5', name: '陈老师', subject: '化学', experience: 8, price: 350, introduction: '化学名师，实验教学见长' },
      { id: '6', name: '赵老师', subject: '生物', experience: 3, price: 200, introduction: '年轻生物教师，教学方法新颖' },
      { id: '7', name: '孙老师', subject: '历史', experience: 10, price: 290, introduction: '历史学科带头人' },
      { id: '8', name: '周老师', subject: '地理', experience: 6, price: 260, introduction: '地理教学能手' },
      { id: '9', name: '吴老师', subject: '政治', experience: 4, price: 240, introduction: '政治教师，备考经验丰富' },
      { id: '10', name: '郑老师', subject: '英语', experience: 15, price: 450, introduction: '英语特级教师' }
    ];
    
    this.setData({
      teachers: mockTeachers,
      filteredTeachers: mockTeachers
    });
  },

  selectSubject: function(e) {
    const subject = e.currentTarget.dataset.subject;
    this.setData({ selectedSubject: subject });
    this.filterTeachers();
  },

  selectExperience: function(e) {
    const experience = e.currentTarget.dataset.experience;
    this.setData({ selectedExperience: experience });
    this.filterTeachers();
  },

  selectPrice: function(e) {
    const price = e.currentTarget.dataset.price;
    this.setData({ selectedPrice: price });
    this.filterTeachers();
  },

  resetFilters: function() {
    this.setData({
      selectedSubject: '全部',
      selectedExperience: 'all',
      selectedPrice: 'all'
    });
    this.filterTeachers();
  },

  filterTeachers: function() {
    const { teachers, selectedSubject, selectedExperience, selectedPrice } = this.data;
    
    let filtered = [...teachers];
    
    if (selectedSubject !== '全部') {
      filtered = filtered.filter(teacher => teacher.subject === selectedSubject);
    }
    
    if (selectedExperience !== 'all' && filtered.length > 0 && 'experience' in filtered[0]) {
      filtered = filtered.filter(teacher => {
        const exp = teacher.experience || 0;
        switch (selectedExperience) {
          case '1-3': return exp >= 1 && exp <= 3;
          case '3-5': return exp > 3 && exp <= 5;
          case '5-10': return exp > 5 && exp <= 10;
          case '10+': return exp > 10;
          default: return true;
        }
      });
    }
    
    if (selectedPrice !== 'all' && filtered.length > 0 && 'price' in filtered[0]) {
      filtered = filtered.filter(teacher => {
        const price = teacher.price || 0;
        switch (selectedPrice) {
          case '0-100': return price < 100;
          case '100-200': return price >= 100 && price <= 200;
          case '200-300': return price > 200 && price <= 300;
          case '300-500': return price > 300 && price <= 500;
          case '500+': return price > 500;
          default: return true;
        }
      });
    }
    
    this.setData({ filteredTeachers: filtered });
  },

  viewTeacherDetail: function(e) {
    const teacher = e.currentTarget.dataset.teacher;
    
    if (teacher) {
      wx.navigateTo({
        url: '/pages/teacherDetail/teacherDetail?teacher=' + JSON.stringify(teacher)
      });
    }
  },

  contactTeacher: function(e) {
    const teacher = e.currentTarget.dataset.teacher;
    wx.showModal({
      title: '联系老师',
      content: '确定要联系 ' + teacher.name + ' 老师吗？',
      success: function(res) {
        if (res.confirm) {
          wx.showToast({
            title: '联系请求已发送',
            icon: 'success'
          });
        }
      }
    });
  },

  onShow: function() {
    return 
  },
  onHide: function() {
    return
  },
  onRouteDone: function() {
  }
});