# 购药->问诊功能测试计划

## Application Overview

基于北大医生IM聊天页面的购药转问诊功能综合测试计划，验证用户购药场景下的医健意图识别、问诊意图判断，以及就诊人选择、转医生、处方单管理等核心业务流程，支持B2C、O2O、企康三种购药类型。

## Test Scenarios

### 1. 模型场景区分验证

**Seed:** `seed.spec.ts`

#### 1.1. 糖尿病症状识别（医健意图）

**File:** `drug_purchase/diabetes_medical_intent.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
     - expect: 页面成功加载并显示AI医生标题
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 点击右上角开启新对话图标
     - expect: 显示欢迎话术
  4. 输入糖尿病症状描述内容并发送
     - expect: 输入内容发送到对话中
     - expect: AI正确识别医健意图，触发购药流程

#### 1.2. 问诊意图判断

**File:** `drug_purchase/consultation_intent_check.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 点击右上角开启新对话图标
     - expect: 显示欢迎话术
  4. 输入问诊相关内容并发送
     - expect: 输入内容发送到对话中
     - expect: AI正确识别问诊意图，进入问诊流程

### 2. 功能点验证

**Seed:** `seed.spec.ts`

#### 2.1. 就诊人选择 - 无就诊人场景

**File:** `drug_purchase/patient_selection_no_patient.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面（使用无就诊人账号）
     - expect: 登录成功并自动跳转到IM页面
  2. 触发购药流程
     - expect: 弹出添加就诊人框
     - expect: 提示用户添加就诊人信息

#### 2.2. 就诊人选择 - 有就诊人场景

**File:** `drug_purchase/patient_selection_with_patient.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面（使用有就诊人账号）
     - expect: 登录成功并自动跳转到IM页面
  2. 触发购药流程
     - expect: 进入就诊人选择页面
     - expect: 显示已有就诊人列表

#### 2.3. 支持转医生逻辑

**File:** `drug_purchase/transfer_to_doctor_logic.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 触发购药并转医生流程
     - expect: 根据APPID维度渠道配置正确开启转医生开关
     - expect: 按开药场景（问诊开药/就医转医生）正确配置

#### 2.4. 处方单调整逻辑

**File:** `drug_purchase/prescription_adjustment.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 完成购药并获取处方单
     - expect: 处方单正常生成
  3. 调整处方单
     - expect: 支持删减药品
     - expect: 支持数量调整
     - expect: 直接返回处方单（不再进入表单）

### 3. 购药类型验证

**Seed:** `seed.spec.ts`

#### 3.1. B2C购药 - 处方药

**File:** `drug_purchase/b2c_prescription_drug.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 触发B2C购药流程（处方药）
     - expect: 处方开单成功（外医优先处理，60s超时机制）
     - expect: 支持处方药购买

#### 3.2. O2O购药 - 非处方药

**File:** `drug_purchase/o2o_otc_drug.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 触发O2O购药流程（非处方药）
     - expect: 仅支持非处方药类型
     - expect: 使用原有处方逻辑下单

#### 3.3. 企康购药

**File:** `drug_purchase/enterprise_health_drug.spec.ts`

**Steps:**
  1. 访问登录并跳转到企康IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 触发企康购药流程
     - expect: 支持处方药和非处方药类型
