# 运营胶囊功能测试计划

## Application Overview

基于北大医生IM聊天页面的运营胶囊功能综合测试计划，验证运营胶囊在不同状态下的展示逻辑，包括胶囊正常展示及问诊过程中的隐藏状态。

## Test Scenarios

### 1. 运营胶囊场景验证

**Seed:** `seed.spec.ts`

#### 1.1. 胶囊展示检查

**File:** `operation_capsule/capsule_display_check.spec.ts`

**Steps:**
  1. 进入im页面
     - expect: 对话下方是运营胶囊，胶囊正常显示在页面中
     - expect: 胶囊内容完整展示
  2. 点击第一个胶囊
     - expect: 点击胶囊后正常跳转
     - expect: 页面展示中正常

#### 1.2. 问诊中隐藏状态

**File:** `operation_capsule/capsule_hidden_during_consultation.spec.ts`

**Steps:**
  1. 输入我要依折麦布片
     - expect: 正常转人工以上
     - expect: 输入框上面是可以点击的胶囊，只剩下个评价胶囊
  2. 点击评价胶囊
     - expect: 进入评价页面
  3. 评价内容都是用最高分评价，立即评论
     - expect: 立即评论，进入评价完成页面
  3. 点击查看评论
     - expect: 页面显示评价详情     
  3. 点击左上角返回按钮
     - expect: 返回到im页面