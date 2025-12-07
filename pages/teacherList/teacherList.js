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
      {
        "id": "T001",
        "gender": "女",
        "name": "王老师",
        "age": 32,
        "subjects": ["数学", "物理"],
        "school": "北京师范大学",
        "location": "北京市海淀区",
        "experience": "8年一线教学经验，曾辅导多名学生考入清华、北大等名校。",
        "latest_class_desc": "最近20节课主要针对高三学生的函数与导数部分进行系统复习，学生掌握情况良好，平均成绩提升15分。",
        "price_range": 300,
        "sort": "教练型老师",
        "teach_grade": ["高一", "高二", "高三"],
        "desc": "教学风格严谨，注重逻辑推理与解题技巧，善于激发学生潜能。",
        "parents_review": "王老师非常负责，孩子数学成绩提升明显，学习态度也变得更积极。",
        "contact": "微信：wanglaoshi001（备注“家长”）",
        "teaching_age": 8 ,
        "image_url":"../../images/teacher1"
        },
      {
        "id": "T002",
        "gender": "男",
        "name": "李洋",
        "age": 28,
        "subjects": ["英语"],
        "school": "上海外国语大学",
        "location": "上海市徐汇区",
        "experience": "5年国际学校与线上外教经验，雅思8.0，擅长口语与写作冲刺。",
        "latest_class_desc": "最近20节课围绕初三口语中考模拟，学生流利度提升30%，错误率下降40%。",
        "price_range": 200,
        "sort": "情感型老师",
        "teach_grade": ["小学", "初一", "初二", "初三"],
        "desc": "课堂氛围轻松，善用故事与游戏激发兴趣，关注学生情绪与自信。",
        "parents_review": "孩子原来害怕开口，现在回家主动用英语讲学校趣事，变化巨大！",
        "contact": "电话：138-0202-2022（微信同号）",
        "teaching_age": 5,
        "image_url":"../../images/teacher2"
      },
      {
        "id": "T003",
        "gender": "女",
        "name": "张婧",
        "age": 35,
        "subjects": ["语文", "写作"],
        "school": "华东师范大学",
        "location": "杭州市西湖区",
        "experience": "12年重点中学班主任，累计发表教学论文20篇，辅导学生获省级作文一等奖8次。",
        "latest_class_desc": "最近20节课完成高一议论文序列训练，学生平均得分由42提升至52（满分60）。",
        "price_range": 400,
        "sort": "启发式老师",
        "teach_grade": ["初一", "初二", "初三", "高一", "高二"],
        "desc": "以“读写一体化”项目串联课堂，引导学生做调研、写报告，培养批判思维。",
        "parents_review": "张老师把语文变成探索课，孩子学会查资料、写报告，成绩与眼界一起涨。",
        "contact": "微信：zjwriting2023",
        "teaching_age": 12,
        "image_url":"../../images/teacher3"
      },
      {
        "id": "T004",
        "gender": "男",
        "name": "陈骁",
        "age": 29,
        "subjects": ["物理", "信息技术"],
        "school": "中国科学技术大学",
        "location": "合肥市蜀山区",
        "experience": "7年竞赛教练，带出3枚物理奥赛金牌，熟悉Arduino与Python编程。",
        "latest_class_desc": "最近20节课完成“智能小车”项目，学生掌握PID调速，两名学员获省赛一等奖。",
        "price_range": 350,
        "sort": "项目制老师",
        "teach_grade": ["初二", "初三", "高一", "高二"],
        "desc": "把物理知识嵌入真实工程问题，学生边做边学，培养系统思维与动手能力。",
        "parents_review": "孩子周末自愿去实验室，说物理“像打游戏通关”，我们家长也惊讶。",
        "contact": "邮箱：chenxiao_lab@qq.com",
        "teaching_age": 7,
        "image_url":"../../images/teacher1.jpg"
      },
      {
        "id": "T005",
        "gender": "女",
        "name": "赵慧",
        "age": 45,
        "subjects": ["小学数学", "思维训练"],
        "school": "南京师范大学",
        "location": "南京市鼓楼区",
        "experience": "20年小学数学教研组长，主编《快乐思维》教材，擅长数独、魔方、速算。",
        "latest_class_desc": "最近20节课完成“数独+魔方”双训练，学生平均速度提升50%，逻辑思维测评提高20%。",
        "price_range": 250,
        "sort": "温和结构化老师",
        "teach_grade": ["小学"],
        "desc": "步骤清晰、节奏舒缓，用儿歌与图形把抽象概念具体化，特别适合低年级。",
        "parents_review": "赵老师声音温柔，孩子从抗拒数学到每天主动做两页题，我们特别感激。",
        "contact": "电话：139-0514-0514（微信同号，备注“小学家长”）",
        "teaching_age": 20,
        "image_url":"../../images/teacher5"
      },
      {
        "id": "T006",
        "gender": "男",
        "name": "孙跃",
        "age": 31,
        "subjects": ["化学"],
        "school": "复旦大学",
        "location": "上海市浦东新区",
        "experience": "9年高三把关教师，熟悉新高考等级考命题趋势，押题命中率高达70%。",
        "latest_class_desc": "最近20节课完成实验题+工业流程专题，学生平均等级考成绩由B+提升至A。",
        "price_range": 400,
        "sort": "教练型老师",
        "teach_grade": ["高二", "高三"],
        "desc": "高强度刷题+错题归因，配套冥想与时间管理训练，帮学生短期突破瓶颈。",
        "parents_review": "孙老师带了两周，孩子模考直接跃到年级前10，效率惊人！",
        "contact": "微信：sunyuechem2020",
        "teaching_age": 9,
        "image_url":"../../images/teacher6"
      }
    ];
    
    this.setData({
      teachers: mockTeachers,
      filteredTeachers: mockTeachers
    });
    // 为详情页提供数据来源（开发/演示用）。生产环境请通过接口在详情页单独请求。
    try{
      const app = getApp();
      if (app && app.globalData) app.globalData.teachers = mockTeachers;
    }catch(e){console.warn('无法设置 globalData.teachers', e)}
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
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    // 通过 id 跳转，详情页从 app.globalData.teachers 中查找对应数据（若不存在则详情页可请求接口）
    wx.navigateTo({
      url: '/pages/teacherDetail/teacherDetail?teacherId=' + encodeURIComponent(id)
    });
  },

  contactTeacher: function(e) {
    const teacher = e.currentTarget.dataset.teacher;
    wx.showModal({
      title: '购买课程',
      content: '确定要购买 ' + teacher.name + ' 老师课程吗，（不满意随时可退）',
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