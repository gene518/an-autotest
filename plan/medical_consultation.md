# 医健咨询功能测试计划

## Application Overview

基于北大医生IM聊天页面的医健咨询功能综合测试计划，验证企康养老险问题、客服问题及疾病/症状咨询的回答准确性与话术正确性，包含卡片展示逻辑。

## Test Scenarios

### 1. 医健咨询场景验证

**Seed:** `seed.spec.ts`

#### 1.1. 企康问题回答（养老险话术+卡片）

**File:** `medical_consultation/enterprise_health_answer.spec.ts`

**Steps:**
  1. 访问登录并跳转到企康IM页面
     - expect: 登录成功并自动跳转到IM页面
     - expect: 页面成功加载并显示AI医生标题
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 点击右上角开启新对话图标
     - expect: 显示欢迎话术
  4. 输入养老险相关问题并发送
     - expect: 输入内容发送到对话中
     - expect: AI回复包含养老险相关话术
     - expect: 回复中附带对应的卡片展示

#### 1.2. 客服问题回答

**File:** `medical_consultation/customer_service_answer.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 点击右上角开启新对话图标
     - expect: 显示欢迎话术
  4. 输入客服相关问题并发送
     - expect: 输入内容发送到对话中
     - expect: AI回复包含正确的客服引导内容

#### 1.3. 疾病/症状咨询

**File:** `medical_consultation/disease_symptom_consultation.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 点击右上角开启新对话图标
     - expect: 显示欢迎话术
  4. 输入疾病或症状咨询内容并发送
     - expect: 输入内容发送到对话中
     - expect: AI给出相关疾病/症状的咨询回复
     - expect: 回复内容专业且准确
