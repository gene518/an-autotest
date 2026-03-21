# 四到服务功能测试计划

## Application Overview

基于北大医生IM聊天页面的四到服务功能综合测试计划，包含慢病模块、体检模块、名医模块、就医模块的全面测试，验证模型场景区分（问诊优于四到）及各功能点的正确性。

## Test Scenarios

### 1. 慢病模块场景验证

**Seed:** `seed.spec.ts`

#### 1.1. 减重直接意图识别

**File:** `four_services/chronic_disease_weight_loss_direct.spec.ts`

**Steps:**
  1. 在对话框输入如何减脂？）并发送
     - expect: 输入内容发送到对话中
     - expect: 回答中有一个慢病管理服务卡片
     - expect: 点击卡片中的按钮，可以正常跳转，跳转后页面正常加载

#### 1.2. 减重间接意图识别

**File:** `four_services/chronic_disease_weight_loss_indirect.spec.ts`

**Steps:**
//todo: 待补充具体步骤  
  1. 在对话框输入间接意图内容（如：走路喘、肥胖导致关节痛）并发送
     - expect: 输入内容发送到对话中
     - expect: AI正确识别间接意图，回复中优先引导问诊

### 2. 体检模块场景验证

**Seed:** `seed.spec.ts`

#### 2.1. 体检权益直接意图

**File:** `four_services/physical_exam_direct.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 点击右上角开启新对话图标
     - expect: 显示欢迎话术
  4. 输入体检权益相关问题（如：体检权益、适合上班族的体检套餐）并发送
     - expect: 输入内容发送到对话中
     - expect: AI优先引导问诊，而非直接推送四到服务

#### 2.2. 体检模块功能点 - 自动发放优惠券

**File:** `four_services/physical_exam_coupon.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 触发体检模块
     - expect: 体检相关卡片展示
  3. 验证优惠券自动发放
     - expect: 系统自动发放优惠券
     - expect: 有权益时卡片显示"去使用"按钮，点击后跳转指定链接
     - expect: 无权益时卡片显示"去购买"按钮，购买完成后刷新为"去使用"

### 3. 名医模块场景验证

**Seed:** `seed.spec.ts`

#### 3.1. 名医直接意图识别

**File:** `four_services/famous_doctor_direct.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 点击右上角开启新对话图标
     - expect: 显示欢迎话术
  4. 输入主动询问名医推荐的内容并发送
     - expect: 输入内容发送到对话中
     - expect: AI优先引导问诊（问诊优于四到）

#### 3.2. 名医间接意图识别

**File:** `four_services/famous_doctor_indirect.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 输入重大疾病相关内容（如：癌症、肿瘤治疗推荐）并发送
     - expect: AI正确识别间接意图，回复引导问诊
     - expect: 名医模块自动发放优惠券
     - expect: 卡片跳转到名医特定页面

### 4. 就医模块场景验证

**Seed:** `seed.spec.ts`

#### 4.1. 挂号直接意图

**File:** `four_services/medical_registration_direct.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 点击右上角开启新对话图标
     - expect: 显示欢迎话术
  4. 输入挂号直接意图（如：我要挂号）并发送
     - expect: 输入内容发送到对话中
     - expect: AI回复相关挂号引导
     - expect: 自动发放优惠券
     - expect: 状态区分与渠道配置正确

#### 4.2. 陪诊直接意图

**File:** `four_services/medical_accompany_direct.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 点击右上角开启新对话图标
     - expect: 显示欢迎话术
  4. 输入陪诊直接意图（如：我要陪诊）并发送
     - expect: 输入内容发送到对话中
     - expect: AI回复陪诊相关引导
     - expect: 自动发放优惠券
