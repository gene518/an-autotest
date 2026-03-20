# 欢迎语功能测试计划

## Application Overview

基于北大医生IM聊天页面的欢迎语功能综合测试计划，验证用户进入对话时AI自动发送欢迎话术的展示逻辑，确保欢迎语在各场景下正确触发和显示。

## Test Scenarios

### 1. 欢迎语场景验证

**Seed:** `seed.spec.ts`

#### 1.1. 欢迎语检查

**File:** `welcome_message/welcome_message_check.spec.ts`

**Steps:**
  1. 访问登录并跳转URL（合并链接）：https://www.jk.cn/landing_smspassword?appId=1&mobile=16013156866&needRedirect=true&smsPassword=666666&returnUrl=https%3A%2F%2Fwww.jk.cn%2Fturky%2F%3FisImmsersive%3Dtrue%26native_back_button_color%3D0%26update_native_backbtn%3Dtrue%23%2Fim%2F10407%3FaccessEntrance%3DAIKYSRHD%26oneKey%3D1
    - expect: 登录成功并自动跳转到IM页面
    - expect: 页面成功加载并显示AI医生标题
  2. 等待页面完全加载并验证核心元素
    - expect: 顶部导航栏显示'对话'和'档案'标签
    - expect: 聊天输入框正常显示
    - expect: AI欢迎消息加载完成
  4. 点击右上角开启新对话按钮，按钮的图标是一个对话图标，图标的中间一个加号的按钮。
    - expect: 重新开启对话，并且第一句话是欢迎话术