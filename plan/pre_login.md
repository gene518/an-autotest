# 登录前置功能测试计划

## Application Overview

基于北大医生IM聊天页面登录前置功能的综合测试计划，验证银行渠道和任意门渠道在未登录状态下进行操作后，登录完成后的操作还原逻辑，包括消息、语音、文本操作的还原情况及超链接/scheme还原的限制。

## Test Scenarios

### 1. 银行渠道登录前置场景验证

**Seed:** `seed.spec.ts`

#### 1.1. 银行渠道 - 消息操作还原

**File:** `pre_login/bank_channel_message_restore.spec.ts`

**Steps:**
  1. 以未登录状态在银行渠道IM页面进行消息发送操作
     - expect: 页面触发登录前置逻辑
     - expect: 引导用户完成登录
  2. 完成登录流程
     - expect: 登录成功
  3. 验证登录后操作还原
     - expect: 登录前发送的消息操作被成功还原
     - expect: 消息正常发送到对话中

#### 1.2. 银行渠道 - 语音操作还原

**File:** `pre_login/bank_channel_voice_restore.spec.ts`

**Steps:**
  1. 以未登录状态在银行渠道IM页面进行语音操作
     - expect: 页面触发登录前置逻辑
     - expect: 引导用户完成登录
  2. 完成登录流程
     - expect: 登录成功
  3. 验证登录后语音操作还原
     - expect: 语音操作被成功还原

#### 1.3. 银行渠道 - 文本操作还原

**File:** `pre_login/bank_channel_text_restore.spec.ts`

**Steps:**
  1. 以未登录状态在银行渠道IM页面进行文本输入操作
     - expect: 页面触发登录前置逻辑
     - expect: 引导用户完成登录
  2. 完成登录流程
     - expect: 登录成功
  3. 验证登录后文本操作还原
     - expect: 文本操作被成功还原

#### 1.4. 银行渠道 - 超链接/scheme不支持还原

**File:** `pre_login/bank_channel_link_no_restore.spec.ts`

**Steps:**
  1. 以未登录状态在银行渠道IM页面点击超链接或scheme
     - expect: 页面触发登录前置逻辑
     - expect: 引导用户完成登录
  2. 完成登录流程
     - expect: 登录成功
  3. 验证超链接/scheme操作不还原
     - expect: 登录后超链接/scheme操作不被还原（符合预期设计）

### 2. 任意门渠道登录前置场景验证

**Seed:** `seed.spec.ts`

#### 2.1. 任意门渠道 - 消息操作还原

**File:** `pre_login/renmendoor_channel_message_restore.spec.ts`

**Steps:**
  1. 以未登录状态在任意门渠道IM页面进行消息发送操作
     - expect: 页面触发登录前置逻辑
     - expect: 引导用户完成登录
  2. 完成登录流程
     - expect: 登录成功
  3. 验证登录后操作还原
     - expect: 登录前的消息操作被成功还原

#### 2.2. 任意门渠道 - 语音操作还原

**File:** `pre_login/renmendoor_channel_voice_restore.spec.ts`

**Steps:**
  1. 以未登录状态在任意门渠道IM页面进行语音操作
     - expect: 页面触发登录前置逻辑
     - expect: 引导用户完成登录
  2. 完成登录流程
     - expect: 登录成功
  3. 验证登录后语音操作还原
     - expect: 语音操作被成功还原

#### 2.3. 任意门渠道 - 文本操作还原

**File:** `pre_login/renmendoor_channel_text_restore.spec.ts`

**Steps:**
  1. 以未登录状态在任意门渠道IM页面进行文本输入操作
     - expect: 页面触发登录前置逻辑
     - expect: 引导用户完成登录
  2. 完成登录流程
     - expect: 登录成功
  3. 验证登录后文本操作还原
     - expect: 文本操作被成功还原

#### 2.4. 任意门渠道 - 超链接/scheme不支持还原

**File:** `pre_login/renmendoor_channel_link_no_restore.spec.ts`

**Steps:**
  1. 以未登录状态在任意门渠道IM页面点击超链接或scheme
     - expect: 页面触发登录前置逻辑
     - expect: 引导用户完成登录
  2. 完成登录流程
     - expect: 登录成功
  3. 验证超链接/scheme操作不还原
     - expect: 登录后超链接/scheme操作不被还原（符合预期设计）
