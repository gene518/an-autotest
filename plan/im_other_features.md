# IM页面其他功能测试计划

## Application Overview

基于北大医生IM聊天页面其他功能的综合测试计划，包含点赞/点踩、猜你想问、循证功能及特殊卡片（加V卡片、评价卡片、复诊卡片）等功能的全面测试，验证各功能在不同场景下的正确触发与展示逻辑。

## Test Scenarios

### 1. 点赞/点踩场景验证

**Seed:** `seed.spec.ts`

#### 1.1. 消息维度点赞/点踩 - 普通消息

**File:** `im_other_features/like_dislike_normal_message.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
     - expect: 页面成功加载并显示AI医生标题
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 发送一般性咨询问题并等待AI回复
     - expect: AI回复普通消息显示正常
  4. 对AI回复进行点赞操作
     - expect: 点赞成功，图标状态变化
  5. 对AI回复进行点踩操作
     - expect: 点踩成功，图标状态变化

#### 1.2. 消息维度点赞/点踩 - 猜你想问

**File:** `im_other_features/like_dislike_guess_you_ask.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 触发猜你想问相关消息
     - expect: 猜你想问消息展示
  4. 对猜你想问消息进行点赞/点踩操作
     - expect: 点赞/点踩操作成功，状态正确变化

#### 1.3. 卡片维度点赞/点踩 - 处方卡片

**File:** `im_other_features/like_dislike_prescription_card.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 触发处方相关流程，生成处方卡片
     - expect: 处方卡片正常展示
  3. 对处方卡片进行点赞/点踩操作
     - expect: 卡片点赞/点踩操作成功

#### 1.4. 卡片维度点赞/点踩 - 体检报告

**File:** `im_other_features/like_dislike_exam_report_card.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 上传体检报告并等待解读
     - expect: 体检报告解读卡片正常展示
  3. 对报告解读卡片进行点赞/点踩操作
     - expect: 报告卡片点赞/点踩操作成功

### 2. 猜你想问场景验证

**Seed:** `seed.spec.ts`

#### 2.1. 猜你想问展示及点击

**File:** `im_other_features/guess_you_ask.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载并检查猜你想问
     - expect: 猜你想问列表正常展示
  3. 点击猜你想问中的一项
     - expect: 该问题自动填入输入框或直接发送
     - expect: AI对该问题进行正常回复

### 3. 循证功能场景验证

**Seed:** `seed.spec.ts`

#### 3.1. 医健咨询话术返回循证链接

**File:** `im_other_features/evidence_based_link.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 输入医健咨询问题并发送
     - expect: AI回复中包含循证链接
     - expect: 点击循证链接可正常跳转到对应医学资料页面

### 4. 特殊卡片场景验证

**Seed:** `seed.spec.ts`

#### 4.1. 加V卡片（问诊中2分钟不回复触发）

**File:** `im_other_features/add_v_card.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 触发问诊流程，进入与医生对话
     - expect: 成功进入问诊中状态
  3. 保持2分钟不回复
     - expect: 系统自动弹出加V卡片
     - expect: 加V卡片内容正确展示

#### 4.2. 评价卡片（问诊中5分钟不回复触发）

**File:** `im_other_features/evaluation_card.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 触发问诊流程，进入与医生对话
     - expect: 成功进入问诊中状态
  3. 保持5分钟不回复
     - expect: 系统自动弹出评价卡片
     - expect: 评价卡片内容正确展示，可进行评价操作

#### 4.3. 复诊卡片（疾病复诊提醒）

**File:** `im_other_features/revisit_card.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 触发疾病复诊相关场景
     - expect: 系统展示复诊卡片
     - expect: 复诊卡片提醒内容正确
     - expect: 点击复诊卡片可正常跳转到复诊流程
