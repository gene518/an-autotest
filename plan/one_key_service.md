# 一键到底功能测试计划

## Application Overview

基于北大医生IM聊天页面的一键到底功能综合测试计划，验证齿科服务、检验检测、运动管理、挂号服务、体检服务五大场景的一键直达功能，确保各服务入口正确跳转及业务流程完整。

## Test Scenarios

### 1. 一键到底场景验证

**Seed:** `seed.spec.ts`

#### 1.1. 齿科服务一键到底

**File:** `one_key_service/dental_service.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
     - expect: 页面成功加载并显示AI医生标题
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 点击右上角开启新对话图标
     - expect: 显示欢迎话术
  4. 输入或触发齿科服务相关入口
     - expect: 页面显示齿科服务一键到底入口
     - expect: 点击后直达齿科服务页面

#### 1.2. 检验检测一键到底

**File:** `one_key_service/lab_test_service.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 触发检验检测服务入口
     - expect: 页面显示检验检测一键到底入口
     - expect: 点击后直达检验检测服务页面

#### 1.3. 运动管理一键到底

**File:** `one_key_service/exercise_management_service.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 触发运动管理服务入口
     - expect: 页面显示运动管理一键到底入口
     - expect: 点击后直达运动管理服务页面

#### 1.4. 挂号服务一键到底

**File:** `one_key_service/registration_service.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 触发挂号服务入口
     - expect: 页面显示挂号服务一键到底入口
     - expect: 点击后直达挂号服务页面

#### 1.5. 体检服务一键到底

**File:** `one_key_service/physical_exam_service.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 触发体检服务入口
     - expect: 页面显示体检服务一键到底入口
     - expect: 点击后直达体检服务页面
