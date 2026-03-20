# 运营胶囊功能测试计划

## Application Overview

基于北大医生IM聊天页面的运营胶囊功能综合测试计划，验证运营胶囊在不同状态下的展示逻辑，包括胶囊正常展示及问诊过程中的隐藏状态。

## Test Scenarios

### 1. 运营胶囊场景验证

**Seed:** `seed.spec.ts`

#### 1.1. 胶囊展示检查

**File:** `operation_capsule/capsule_display_check.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
     - expect: 页面成功加载并显示AI医生标题
  2. 等待页面完全加载并验证核心元素
     - expect: 顶部导航栏显示'对话'和'我的'标签
     - expect: 聊天输入框正常显示
  3. 验证运营胶囊在入口处的展示情况
     - expect: 运营胶囊正常显示在页面中
     - expect: 胶囊内容完整展示

#### 1.2. 问诊中隐藏状态

**File:** `operation_capsule/capsule_hidden_during_consultation.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
     - expect: 页面成功加载并显示AI医生标题
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 点击右上角开启新对话图标
     - expect: 显示欢迎话术
  4. 在对话框输入问诊相关问题（如：腹痛怎么办）并发送
     - expect: 输入内容发送到对话中
     - expect: AI进入问诊流程
  5. 验证问诊中运营胶囊的状态
     - expect: 运营胶囊在问诊中处于隐藏状态，不再展示
