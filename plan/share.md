# 分享功能测试计划

## Application Overview

基于北大医生IM聊天页面分享功能的综合测试计划，验证安主任小程序/平安好医生小程序分享、插件分享（任意门/口袋银行）及主客分享三种方式的正确性与完整性。

## Test Scenarios

### 1. 分享功能场景验证

**Seed:** `seed.spec.ts`

#### 1.1. 安主任小程序分享

**File:** `share/anzhurenxcx_share.spec.ts`

**Steps:**
  1. 访问登录并跳转到安主任小程序IM页面
     - expect: 登录成功并自动跳转到IM页面
     - expect: 页面成功加载并显示AI医生标题
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 触发分享功能入口
     - expect: 分享入口正常展示
  4. 执行分享操作（安主任小程序）
     - expect: 分享内容正确生成
     - expect: 分享完成，显示成功提示

#### 1.2. 平安好医生小程序分享

**File:** `share/pahao_share.spec.ts`

**Steps:**
  1. 访问登录并跳转到平安好医生小程序IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 触发分享功能入口
     - expect: 分享入口正常展示
  4. 执行分享操作
     - expect: 分享内容正确生成
     - expect: 分享完成

#### 1.3. 插件分享 - 任意门渠道

**File:** `share/plugin_share_renmendoor.spec.ts`

**Steps:**
  1. 访问任意门渠道登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 触发插件分享功能
     - expect: 插件分享入口正常展示
     - expect: 分享内容正确生成（任意门渠道）

#### 1.4. 插件分享 - 口袋银行渠道

**File:** `share/plugin_share_pocket_bank.spec.ts`

**Steps:**
  1. 访问口袋银行渠道登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 触发插件分享功能
     - expect: 插件分享入口正常展示
     - expect: 分享内容正确生成（口袋银行渠道）

#### 1.5. 主客分享

**File:** `share/host_guest_share.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 触发主客分享功能
     - expect: 主客分享入口正常展示
     - expect: 主客分享内容生成正确
     - expect: 分享操作完成后状态正常
