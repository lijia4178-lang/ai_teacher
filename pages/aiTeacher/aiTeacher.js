// 引入 Toast 组件
import Toast from '@vant/weapp/toast/toast'
import instance from '../../utils/http.js'

import { AI_CONFIG } from '../../config/aiConfig.js'


Page({
  data: {
    messages: [],
    inputContent: '',
    loading: false,
    isRecording: false,
    scrollToMessage: '',
    show: false,
    columns: ['学生', '老师', '家长'],
    presets: [
      { label: '未来画像' },
      { label: '孩子适合文科还是理科' },
      { label: '孩子适合一对一还是班课' },
      { label: '孩子不听话' },
      { label: '孩子不亲近我' },
      { label: '答疑解惑' }
    ],
    selectedPreset: -1,
    showRecordingTip: false,
    recordingTip: '',
    // 新增：用于存储正在流式传输的AI回复内容
    currentAIResponse: ''
  },

  // 页面加载时初始化
  onLoad: function() {
    try {
      const app = getApp()
      const messages = app.globalData.messages || []
      
      this.setData({
        messages: messages
      })
      
      // 如果有历史记录，滚动到最后一条消息
      if (messages.length > 0) {
        this.setData({
          scrollToMessage: `message-${messages.length - 1}`
        })
      }else{
      // 请求后端获取消息记录
      instance.get('/chat',{'content-type':'application/json','Authorization':app.globalData.token},{timeout:30000}).then(res => {
        if (res.data.code === 200) {
          this.setData({
            messages: res.data.data
          })
        }
      })
    }
    }catch (error) {
      console.error('加载聊天记录失败:', error)
    } 

  },

  // 加载聊天记录
  loadChatHistory: function() {
    try {
      const app = getApp()
      const messages = app.globalData.messages || []
      
      this.setData({
        messages: messages
      })
      
      // 如果有历史记录，滚动到最后一条消息
      if (messages.length > 0) {
        this.setData({
          scrollToMessage: `message-${messages.length - 1}`
        })
      }
    } catch (error) {
      console.error('加载聊天记录失败:', error)
    }
  },

  // 开始录音
  startVoice: function() {
    console.log('开始录音 - 长按语音按钮')
    
    this.setData({ 
      isRecording: true,
      showRecordingTip: true,
      recordingTip: '正在录音... 松手结束'
    })
    
    // 显示持续提示（不会自动消失）
    Toast({
      message: '正在录音... 松手结束',
      selector: '#van-toast',
      duration: 0 // 设置为0，保持持续显示
    })
    
    // TODO: 开始录音逻辑
  },

  // 结束录音
  stopVoice: function() {
    if (!this.data.isRecording) {
      return // 防止重复触发
    }
    
    console.log('结束录音 - 松开语音按钮')
    
    // 清除持续显示的提示
    Toast.clear();
    
    this.setData({ 
      isRecording: false,
      showRecordingTip: false,
      recordingTip: ''
    })
    
    // 显示结束提示（短暂显示）
    Toast({
      message: '录音结束',
      selector: '#van-toast',
      duration: 1500 // 1.5秒后自动消失
    })
    
    // TODO: 停止录音逻辑
  },

  // 处理触摸取消事件（防止意外中断）
  cancelVoice: function() {
    if (this.data.isRecording) {
      console.log('取消录音 - 触摸意外中断')
      this.stopVoice()
    }
  },

  // 输入框内容变化
  onInputChange: function(e) {
    this.setData({
      inputContent: e.detail.value
    })
  },


 
  // 调用AI大模型API（非流式）
  async callAIAPI(message, userType) {
    try {
      // 显示加载状态
      Toast.loading({
        message: 'AI思考中...',
        forbidClick: true,
        duration: 0
      })
      
      // 使用wx.request直接调用API
      return new Promise((resolve, reject) => {
        wx.request({
          url: AI_CONFIG.KIMI.BASE_URL + '/chat/completions',
          method: 'POST',
          timeout: 30000,
          header: {
          'Authorization': 'Bearer ' + AI_CONFIG.KIMI.API_KEY,
          'Content-Type': 'application/json'
        },
          data: {
              model: AI_CONFIG.KIMI.MODEL,
            messages: [
              {
                role: 'system',
                content: AI_CONFIG.SYSTEM_PROMPTS[userType] || "你是AI助手"
              },
              {
                role: 'user',
                content: message
              }
            ]
          },
          success: (res) => {
            Toast.clear()
            resolve(res)
          },
          fail: (error) => {
            Toast.clear()
            reject(error)
          }
        })
      })
    } catch (error) {
      Toast.clear()
      throw error
    }
  },

  // 调用AI大模型API（流式）
  async callAIAPIStream(message, userType, onChunk, onComplete) {
    try {
      // 显示加载状态
      Toast.loading({
        message: 'AI思考中...',
        forbidClick: true,
        duration: 0
      })

      // 设置初始AI响应为空
      this.setData({
        currentAIResponse: ''
      })

      // 用于存储完整的AI响应
      let fullResponse = ''
      let isComplete = false

      // 模拟流式响应（实际项目中应使用服务器发送事件或WebSocket）
      // 这里使用setTimeout模拟流式传输的效果
      const mockStreamResponse = async () => {
        // 首先调用非流式API获取完整响应
        try {
          const response = await this.callAIAPI(message, userType)
          const aiContent = response.data.choices[0].message.content
          fullResponse = aiContent
          
          // 将完整响应按字符分割，模拟流式输出
          const chars = aiContent.split('')
          let index = 0
          
          const sendNextChar = () => {
            if (index < chars.length) {
              // 每次添加1-3个字符，模拟不同的流式传输速度
              const chunkSize = Math.min(Math.floor(Math.random() * 3) + 1, chars.length - index)
              const chunk = chars.slice(index, index + chunkSize).join('')
              index += chunkSize
              
              // 更新当前AI响应
              this.setData({
                currentAIResponse: this.data.currentAIResponse + chunk
              })
              
              // 调用回调函数传递当前块
              onChunk && onChunk({
                content: this.data.currentAIResponse,
                isComplete: false,
                // 标记为Markdown内容，方便前端渲染
                isMarkdown: true
              })
              
              // 继续发送下一个字符块
              setTimeout(sendNextChar, 30 + Math.random() * 100) // 随机延迟，模拟真实网络延迟
            } else {
              // 流式传输完成
              isComplete = true
              Toast.clear()
              onComplete && onComplete(fullResponse)
            }
          }
          
          // 开始流式传输
          sendNextChar()
        } catch (error) {
          console.error('流式AI调用失败:', error)
          Toast.clear()
          onChunk && onChunk({
            content: '抱歉，我暂时无法回答这个问题。请检查网络连接或稍后再试。',
            isComplete: true,
            isMarkdown: true
          })
        }
      }

      // 开始模拟流式响应
      mockStreamResponse()
    } catch (error) {
      console.error('流式AI调用失败:', error)
      Toast.clear()
    }
  },
  
  // 发送消息
  sendMessage: async function() {
    if (!this.data.inputContent.trim()) {
      return
    }
    
    // 获取用户类型
    const app = getApp()
    const userType = app.globalData.user_type || '学生'
    
    // 先保存当前输入内容，避免清空后传递空字符串
    const currentInput = this.data.inputContent

    // 添加用户消息
    const userMessage = {
      type: 'user',
      content: currentInput
    }
    
    this.data.messages.push(userMessage)
    this.setData({
      messages: this.data.messages,
      inputContent: '',
      loading: true,
      scrollToMessage: `message-${this.data.messages.length - 1}`
    })
    
    // 如果用户输入匹配老师，直接在聊天区展示最多4位老师的卡片
    const matched = this.findMatchingTeachers(currentInput)
    if (matched && matched.length) {
      const aiMessage = {
        type: 'ai',
        content: '为您找到以下老师：',
        teacherCards: matched.slice(0, 4),
        boxes: []
      }

      this.data.messages.push(aiMessage)
      this.setData({
        messages: this.data.messages,
        loading: false,
        scrollToMessage: `message-${this.data.messages.length - 1}`
      })
      // 将结果持久化
      const app = getApp()
      app.globalData.messages = this.data.messages
      app.saveMessages && app.saveMessages(this.data.messages)
      return
    }

    // 使用流式传输发送消息（默认AI回复）
    await this.sendStreamMessage(currentInput, userType)
  },

  // 根据输入查找匹配老师（基于姓名/id/科目/学校模糊匹配）
  findMatchingTeachers: function(input) {
    if (!input || !input.trim()) return []
    const q = input.trim().toLowerCase()
    const app = getApp()
    let teachers = (app && app.globalData && app.globalData.teachers) || []

    // 若没有全局数据则尝试从 teacherList 页面的 mock 数据初始化
    if (!teachers || teachers.length === 0) {
      try {
        // 动态引入 teacherList 的 mock 数据路径（不保证可用，仅兜底）
        teachers = []
      } catch (e) {
        teachers = []
      }
    }

    // 简单模糊匹配：姓名、id、subjects、school
    const matched = teachers.filter(t => {
      try {
        const name = (t.name || '').toString().toLowerCase()
        const id = (t.id || '').toString().toLowerCase()
        const school = (t.school || '').toString().toLowerCase()
        const subjects = (t.subjects || []).join(' ').toLowerCase()

        return name.includes(q) || id.includes(q) || school.includes(q) || subjects.includes(q)
      } catch (e) {
        return false
      }
    })

    return matched
  },

  // 流式响应功能（使用本地模拟实现）
  async sendStreamMessage(message, userType) {
    try {
      this.setData({ loading: true })
      
      // 创建一个占位的AI消息
      const aiMessage = {
        type: 'ai',
        content: '',
        boxes: []
      }
      
      this.data.messages.push(aiMessage)
      this.setData({
        messages: this.data.messages,
        scrollToMessage: `message-${this.data.messages.length - 1}`
      })
      
      // 调用流式API并处理响应
      await this.callAIAPIStream(
          message,
          userType,
          (chunk) => {
            // 更新最后一条AI消息并集成Markdown解析
            const lastIndex = this.data.messages.length - 1
            if (lastIndex >= 0 && this.data.messages[lastIndex].type === 'ai') {
              this.data.messages[lastIndex].content = chunk.content
              this.data.messages[lastIndex].boxes = chunk.boxes || []
              // 确保正确设置Markdown标记，便于mp-html组件渲染
              this.data.messages[lastIndex].isMarkdown = chunk.isMarkdown === true
            
            this.setData({
              messages: this.data.messages,
              scrollToMessage: `message-${lastIndex}`
            })
          }
        },
        (fullContent) => {
          // 流式传输完成，保存完整消息
          const app = getApp()
          app.globalData.messages = this.data.messages
          app.saveMessages(this.data.messages)
          
          this.setData({ loading: false })
        }
      )
      
    } catch (error) {
      console.error('流式AI调用失败:', error)
      this.setData({ loading: false })
      
      // 显示错误消息
      const errorMessage = {
        type: 'ai',
        content: '抱歉，我暂时无法回答这个问题。请检查网络连接或稍后再试。',
        boxes: [
          { key: '状态', value: '网络错误' }
        ]
      }
      
      this.data.messages.push(errorMessage)
      this.setData({
        messages: this.data.messages,
        scrollToMessage: `message-${this.data.messages.length - 1}`
      })
    }
  },

  // 选择预设
  selectPreset: function(e) {
    const index = e.currentTarget.dataset.index
    const preset = this.data.presets[index]
    
    this.setData({
      selectedPreset: index,
      inputContent: preset.label
    })
  },

  // van-picker change 事件处理
  onChange: function(e) {
    console.log('picker change:', e.detail)
  },

  // van-picker confirm 事件处理
  onConfirm: function(e) {
    console.log('picker confirm:', e.detail)
    this.setData({ show: false })
  },

  // van-picker cancel 事件处理
  onCancel: function() {
    console.log('picker cancel')
    this.setData({ show: false })
  },

  // 点击AI信息框
  onBoxTap: function(e) {
    const msgIndex = e.currentTarget.dataset.msgIndex
    const boxIndex = e.currentTarget.dataset.boxIndex
    console.log('点击AI信息框:', msgIndex, boxIndex)
  },
  // 点击老师卡片查看详情
  viewTeacherDetailFromCard: function(e) {
    const teacherId = e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.id
    if (!teacherId) return
    wx.navigateTo({
      url: '/pages/teacherDetail/teacherDetail?teacherId=' + encodeURIComponent(teacherId)
    })
  },
  // 卡片上的联系/购买按钮
  contactTeacherFromCard: function(e) {
    const ds = e.currentTarget && e.currentTarget.dataset || {}
    const teacherName = ds.name || ds.teacherName || '该老师'
    const teacherId = ds.id || ds.teacherId
    const price = ds.price || ds.priceRange || ''

    const content = price ? `确定要购买 ${teacherName} 的课程（价格：${price}）吗？` : `确定要购买 ${teacherName} 的课程吗？`
    wx.showModal({
      title: '购买课程',
      content: content,
      success: function(res) {
        if (res.confirm) {
          wx.showToast({ title: '联系请求已发送', icon: 'success' })
        }
      }
    })
  },
  onShow: function() {
  }
  
})