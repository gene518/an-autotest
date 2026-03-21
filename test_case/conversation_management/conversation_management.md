# 对话管理功能测试计划

## Application Overview

基于北大医生IM聊天页面对话管理功能的综合测试计划，验证新开对话（结束当前对话）及历史对话管理（最多删除20个）等功能的操作逻辑与正确性。

## Test Scenarios

### 1. 对话管理场景验证

**Seed:** `seed.spec.ts`

#### 1.1. 新开对话（结束当前对话）

**File:** `conversation_management/new_conversation.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
     - expect: 页面成功加载并显示AI医生标题
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 新开启对话
     - expect: 对话正常开启
  3. 在当前对话中发送一条消息，硼酸洗剂如何使用。
     - expect: 消息成功发送，AI回复正常
  4. 点击右上角开启新对话图标（中间带加号的对话图标）
     - expect: 当前对话结束
     - expect: 新对话页面展示，显示欢迎话术
     - expect: 历史消息不再显示在当前对话视图中

#### 1.2. 历史对话查看

**File:** `conversation_management/history_conversation_view.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 右上角又个三条横线的按钮，点击它进入历史对话列表入口
     - expect: 历史对话列表正常展示
     - expect: 列表中显示过去的对话记录

#### 1.3. 历史对话删除（最多20个）

**File:** `conversation_management/history_conversation_delete.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
     - expect: 页面成功加载并显示AI医生标题
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 新开启对话
     - expect: 对话正常开启
  3. 右上角又个三条横线的按钮，点击它进入历史对话列表入口
     - expect: 历史对话列表正常展示
  4. 点击管理这个按钮，进入对话编辑页面
     - expect: 页面展示取消、删除两个按钮
  4. 选中第一条历史对话，并且保存当前历史对话标题信息
     - expect: 选中对话图标按钮高亮
  4. 点击删除对话按钮
     - expect: 被训中的对话可成功删除
