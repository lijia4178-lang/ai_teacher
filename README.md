# AI助教微信小程序

这是一个微信小程序，提供AI聊天、教师名单和个人中心功能。

## 功能特点

1. **AI老师**：与AI进行智能聊天，支持语音转文字功能
2. **教师名单**：查看所有教师的详细信息
3. **我的**：个人中心，包含清除聊天记录、关于我们等功能

## 项目结构

```
├── app.js                 # 小程序入口文件
├── app.json               # 小程序全局配置
├── app.wxss               # 小程序全局样式
├── package.json           # 项目配置文件
├── .gitignore             # Git忽略文件
├── README.md              # 项目说明文档
├── images/                # 图片资源文件夹
│   ├── ai_teacher.png     # AI老师图标
│   ├── ai_teacher_selected.png
│   ├── teacher_list.png   # 教师名单图标
│   ├── teacher_list_selected.png
│   ├── my.png             # 我的图标
│   ├── my_selected.png
│   ├── ai_avatar.png      # AI头像
│   ├── user_avatar.png    # 用户头像
│   ├── voice.png          # 语音图标
│   ├── arrow_right.png    # 箭头图标
│   ├── teacher1.png       # 教师头像1
│   ├── teacher2.png       # 教师头像2
│   ├── teacher3.png       # 教师头像3
│   ├── clear.png          # 清除图标
│   ├── about.png          # 关于图标
│   ├── feedback.png       # 反馈图标
│   └── settings.png       # 设置图标
└── pages/                 # 页面文件夹
    ├── aiTeacher/         # AI老师页面
    ├── teacherList/       # 教师名单页面
    └── my/                # 我的页面
```

## 开发说明

1. 使用微信开发者工具导入项目
2. 在app.js中可以修改教师信息数据
3. AI回复逻辑在aiTeacher.js中，可以根据需要进行扩展
4. 语音识别功能需要接入实际的语音识别服务

## 注意事项

1. 项目中使用的图片资源需要替换为实际的图片
2. 语音识别功能需要在微信小程序中配置相应的API权限
3. 实际部署时需要接入真实的AI聊天接口