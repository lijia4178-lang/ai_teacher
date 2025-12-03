// AI大模型配置文件
const AI_CONFIG = {
  // OpenAI API 配置
    KIMI: {
    API_KEY: 'sk-DJ9xk7Lo8gI3R4zz7cuGcqak3gu5sDXJvGR5WkHFCsA8LQUU', // 请替换为你的OpenAI API密钥
    BASE_URL: 'https://api.moonshot.cn/v1',
    MODEL: 'kimi-k2-turbo-preview',
    MAX_TOKENS: 1000,
    TEMPERATURE: 0.7
  },


  // 系统提示词配置
  SYSTEM_PROMPTS: {  
    'teacher': `你是一个专业的AI教学助手，帮助老师提升教学效果。你的回答应该：
1. 提供教学方法和策略建议
2. 分享课堂管理和学生评估技巧
3. 推荐适合的教学资源和工具
4. 协助课程设计和教学计划制定
5. 提供教育理论支持`,
    
    'parent': `你是一个贴心的AI教育顾问，专门帮助家长更好地支持孩子学习。你的回答应该：
1. 提供家庭教育建议和方法
2. 帮助理解孩子的学习需求和困难
3. 推荐适合家庭的学习资源和活动
4. 协助家长与学校和老师沟通
5. 提供儿童心理发展指导`
  },

  // 预设回复模板
  RESPONSE_TEMPLATES: {
    ERROR: {
      content: '抱歉，我暂时无法回答这个问题。请检查网络连接或稍后再试。',
      boxes: [{ key: '状态', value: '服务异常' }]
    },
    
    LOADING: {
      content: '正在思考中，请稍候...',
      boxes: [{ key: '状态', value: '处理中' }]
    },
    
    WELCOME: {
      content: '你好！我是你的AI助教，很高兴为你提供帮助。你可以问我任何学习相关的问题，我会尽力为你解答。',
      boxes: [
        { key: '功能', value: '答疑解惑' },
        { key: '状态', value: '在线' }
      ]
    }
  },

  // API请求配置
  REQUEST_CONFIG: {
    TIMEOUT: 30000, // 30秒超时
    RETRY_COUNT: 3, // 重试次数
    RETRY_DELAY: 1000 // 重试延迟（毫秒）
  },

  // 当前使用的AI服务提供商
  CURRENT_PROVIDER: 'KIMI' // 可选：OPENAI, ZHIPU, BAIDU
}

module.exports = {
  AI_CONFIG,
  getCurrentProvider: () => AI_CONFIG.CURRENT_PROVIDER,
  getSystemPrompt: (userType) => AI_CONFIG.SYSTEM_PROMPTS[userType] || AI_CONFIG.SYSTEM_PROMPTS['学生'],
  getApiConfig: (provider = AI_CONFIG.CURRENT_PROVIDER) => AI_CONFIG[provider]
}