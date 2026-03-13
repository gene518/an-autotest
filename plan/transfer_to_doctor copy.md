# 健康界IM页面完整功能测试计划

## Application Overview

基于健康界(jk.cn)平台的AI医生IM聊天功能的综合测试计划，包含用户登录态管理、聊天功能、专家咨询、拍报告解读、微信问医、用户中心等核心功能模块的全面测试。测试重点关注移动端用户体验，验证AI医生问答、历史对话、多媒体交互等关键业务流程。

## Test Scenarios

### 1. 转医生场景验证

**Seed:** `seed.spec.ts`

#### 1.1. 购买非处方药转医生

**File:** `transfer_to_doctor/otc_to_doctor`

**Steps:**
  1. 访问登录并跳转URL（合并链接）：https://www.jk.cn/landing_smspassword?appId=1&mobile=16013156866&needRedirect=true&smsPassword=666666&returnUrl=https%3A%2F%2Fwww.jk.cn%2Fturky%2F%3FisImmsersive%3Dtrue%26native_back_button_color%3D0%26update_native_backbtn%3Dtrue%23%2Fim%2F10407%3FaccessEntrance%3DAIKYSRHD%26oneKey%3D1
    - expect: 登录成功并自动跳转到IM页面
    - expect: 页面成功加载并显示AI医生标题
  2. 等待页面完全加载并验证核心元素
    - expect: 顶部导航栏显示'对话'和'我的'标签
    - expect: 聊天输入框正常显示
    - expect: AI欢迎消息加载完成
  4. 点击右上角开启新对话图标，图标是一个对话图标，中间一个加号。
    - expect: 显示欢迎话术
  5. 对话框输入：我要买红霉素软膏
    - expect: 输入框成功输入响应文字。
  6. 点击输入框右边的发送按钮
    - expect: 输入框清空
    - expect: 输入内容发送到对话中。
    - expect: 对话下面有ai回复的药品介绍。
    - expect: 对话下面有ai回复的药品购买卡片。
    - expect: 药品购买卡片有闪电购药标签。
    - expect: ai回复有一句话包含"转至在线医生"。
    - expect: 对话中有一句信息素，内容包含xx科为您服务。
    - expect: 医生发的一句话包含我是xx医生，正在查看您的历史聊天记录。

#### 1.2. 转人工转医生

**File:** `transfer_to_doctor/switch_to_manual.spec.ts`

**Steps:**
  1. 访问登录并跳转URL（合并链接）：https://www.jk.cn/landing_smspassword?appId=1&mobile=16013156866&needRedirect=true&smsPassword=666666&returnUrl=https%3A%2F%2Fwww.jk.cn%2Fturky%2F%3FisImmsersive%3Dtrue%26native_back_button_color%3D0%26update_native_backbtn%3Dtrue%23%2Fim%2F10407%3FaccessEntrance%3DAIKYSRHD%26oneKey%3D1
    - expect: 登录成功并自动跳转到IM页面
    - expect: 页面成功加载并显示AI医生标题
  2. 等待页面完全加载并验证核心元素
    - expect: 顶部导航栏显示'对话'和'我的'标签
    - expect: 聊天输入框正常显示
    - expect: AI欢迎消息加载完成
  2. 点击右上角开启新对话图标，图标是一个对话图标，中间一个加号。
    - expect: 显示欢迎话术
  4. 对话框输入：转人工
    - expect: 输入框成功输入响应文字。
  5. 点击输入框右边的发送按钮
    - expect: 输入框清空
    - expect: 输入内容发送到对话中。
    - expect: 对话下面有ai回复的药品介绍。
    - expect: 对话下面有ai回复的药品购买卡片。
    - expect: 药品购买卡片有闪电购药标签。
    - expect: ai回复有一句话包含"转至在线医生"。
    - expect: 对话中有一句信息素，内容报告xx科为您服务。
    - expect: 医生发的一句话包含我是xx医生，正在查看您的历史聊天记录。


#### 1.3. 积分转人工

**File:** `transfer_to_doctor/points_to_doctor.spec.ts`

**Steps:**
  1. 访问登录并跳转URL（合并链接）：https://www.jk.cn/landing_smspassword?appId=1&mobile=16013156866&needRedirect=true&smsPassword=666666&returnUrl=https%3A%2F%2Fwww.jk.cn%2Fturky%2F%3FisImmsersive%3Dtrue%26native_back_button_color%3D0%26update_native_backbtn%3Dtrue%23%2Fim%2F10407%3FaccessEntrance%3DAIKYSRHD%26oneKey%3D1
    - expect: 登录成功并自动跳转到IM页面
    - expect: 页面成功加载并显示AI医生标题
  2. 等待页面完全加载并验证核心元素
    - expect: 顶部导航栏显示'对话'和'我的'标签
    - expect: 聊天输入框正常显示
    - expect: AI欢迎消息加载完成
  4. 点击右上角开启新对话图标，图标是一个对话图标，中间一个加号。
    - expect: 显示欢迎话术
  5. 循环发送：“硼酸洗剂如何使用”，并且每句话都检查下文本是否发出去了。直到检查到下面的断言，表示用例通过。
    - expect: 输入框成功输入响应文字。
    - expect: ai回复有一句话包含"转至在线医生"。
    - expect: 对话中有一句信息素，内容包含xx科为您服务。
    - expect: 医生发的一句话包含我是xx医生，正在查看您的历史聊天记录。


#### 1.5. 问诊转人工

**File:** `transfer_to_doctor/consultation_summary_to_doctor.spec.ts`

**测试配置:**
- 测试超时时间：2分钟（120000ms）
- **原因:** 问诊流程需要多轮AI交互，每轮等待8秒

**测试目标:** 验证完整的AI问诊流程及最终转接人工医生的全流程

**实现细节:**

**步骤1: 建立登录态**
- 访问登录URL
- **断言:** 验证显示`success":true`

**步骤2: 访问IM页面并验证**
- 访问IM页面
- **断言:** 验证'对话'标签（使用`exact: true`）
- **断言:** 验证'我的'标签
- **断言:** 验证输入框可见

**步骤3: 开启新对话**
- 点击第2个button
- **断言:** 验证欢迎卡片`.welcome-card-bg__desc`可见（超时10秒）

**步骤4: 发送问诊问题**
- 点击输入框
- 填写："腹痛怎么办"
- 定位发送按钮：`page.locator('span.chat-send-btn')`
- **关键:** 使用`tap()`发送（移动端必需）

**步骤5: 选择就诊人（关键步骤）**
- **5.1 等待就诊人选择卡片**
  - 控制台输出："等待就诊人选择卡片..."
  - **断言:** 验证显示"请问您本次是为谁咨询"（超时15秒）

- **5.2 定位就诊人元素**
  - 使用正则`/\d+岁/`匹配包含年龄的元素
  - 使用`.first()`获取第一个就诊人
  - 获取就诊人文本内容（如"刘仁莲 女 32岁"）
  - 控制台输出：`准备选择就诊人: ${patientText}`

- **5.3 点击就诊人**
  - **关键:** 使用`tap()`而非`click()`（移动端页面必需）
  - **技术原因:** 移动端触摸事件与鼠标点击事件处理不同

- **5.4 检查是否需要确认按钮**
  - 等待1秒
  - 检查是否有"发送"按钮：`page.getByRole('button', { name: '发送' })`
  - 检查是否有"确认"按钮：`page.getByRole('button', { name: '确认' })`
  - 如有发送按钮：点击并输出"已点击发送按钮提交就诊人"
  - 如有确认按钮：点击并输出"已点击确认按钮提交就诊人"
  - 如都没有：输出`已选择就诊人: ${patientText}`（直接生效）

- **5.5 等待AI开始问诊**
  - 等待2秒让系统处理就诊人选择

**步骤6: 循环回复AI问诊问题（核心逻辑）**
- **循环配置:**
  - 最大循环次数：20轮
  - **目的:** 防止无限循环，通常4-6轮即可完成问诊

- **6.1 智能等待AI回复（每轮开始）**
  - 使用`Promise.race()`并行等待以下任一条件出现（超时8秒）：
    1. `page.getByText('健康小结')` - 问诊完成
    2. `page.getByText('为您服务')` - 已转医生
    3. `page.getByText('其他，可以打字告诉我')` - 选项卡片
    4. `page.locator('h3:has-text("单选")')` - 单选题
    5. `page.locator('h3:has-text("多选")')` - 多选题
  - 如超时：
    - 检查error.message是否包含'closed'或'detached'（页面已关闭）
    - 如页面关闭则退出循环
    - 否则等待3秒后继续（AI还在思考）

- **6.2 检查是否完成问诊**
  - 检查"健康小结"是否可见（使用`.catch(() => false)`避免异常）
  - 检查"为您服务"是否可见
  - 如任一条件满足：
    - 控制台输出：`问诊在第${i + 1}轮结束`
    - 退出循环

- **6.3 检查是否有选项卡片**
  - 检查3种识别方式：
    1. `page.getByText('其他，可以打字告诉我')`
    2. `page.locator('h3:has-text("单选")')`
    3. `page.locator('h3:has-text("多选")')`
  - 如任一可见则hasOptionCard = true

- **6.4 处理选项卡片（有选项时）**
  - **6.4.1 初始化**
    - 控制台输出：`第${i + 1}轮问诊：发现选项卡片，开始随机选择选项`
    - 初始化totalSelected = 0

  - **6.4.2 查找选项组**
    - 定位所有选项组标题：`page.locator('h3:has-text("单选"), h3:has-text("多选")')`
    - 获取选项组数量：`groupCount`
    - 控制台输出：`发现 ${groupCount} 个选项组`

  - **6.4.3 遍历每个选项组（for循环）**
    - **a) 获取选项组信息**
      - 获取第g个标题：`optionGroupTitles.nth(g)`
      - 获取标题文本：`titleText`
      - 判断类型：`isSingleChoice = titleText?.includes('单选')`
      - 确定选择数量：
        - 单选：selectCount = 1
        - 多选：selectCount = 2
      - 控制台输出：`选项组${g + 1}: "${titleText}" (${单选/多选}，选${selectCount}个)`

    - **b) 获取选项组容器**
      - 使用`groupTitle.locator('..')`获取父容器
      - **目的:** 限制选项搜索范围，避免跨组选择

    - **c) 查找容器内所有选项**
      - 选择器：`groupContainer.locator('div[class*="chat-option"], div[class*="option-item"], span[class*="option"], button[class*="option"]')`
      - **技术细节:** 使用`[class*="xxx"]`模糊匹配class名称
      - 获取选项数量：`optionCount`
      - 控制台输出：`该组共有 ${optionCount} 个选项`

    - **d) 处理无选项情况**
      - 如optionCount === 0：
        - 控制台输出："未找到选项，跳过此组"
        - continue跳过本组

    - **e) 生成随机索引序列**
      - 创建索引数组：`[0, 1, 2, ..., optionCount-1]`
      - 随机打乱：`.sort(() => Math.random() - 0.5)`
      - **目的:** 确保每次运行选择的选项随机

    - **f) 遍历随机索引选择选项**
      - 初始化groupSelectedCount = 0
      - for循环遍历shuffledIndices：
        - 如`groupSelectedCount >= selectCount`则break（已选够）
        - 获取选项：`allOptionsInGroup.nth(idx)`
        - 检查是否可见（使用`.catch(() => false)`）
        - 如可见：
          - 获取选项文本：`optionText`
          - 点击选项：`option.click()`
          - 控制台输出：`随机选择索引${idx}: ${optionText?.trim()}`
          - 计数器：`groupSelectedCount++`, `totalSelected++`
          - 等待200ms让UI更新
        - 如出错：
          - 控制台输出：`选择索引${idx}失败，继续下一个`

  - **6.4.4 提交选项**
    - 控制台输出：`共选择了 ${totalSelected} 个问诊选项`
    - **尝试点击发送按钮:**
      - 定位：`page.getByRole('button', { name: '发送' })`
      - 等待可见（超时5秒）
      - 点击并输出："成功提交选项"
    - **发送按钮未出现的备用方案:**
      - 控制台输出："发送按钮未出现，改为文本回复"
      - 定位输入框并等待可见（超时5秒）
      - 点击输入框
      - 填写："不清楚"
      - 使用`tap()`发送
      - 如输入也失败：输出"文本输入也失败，跳过此轮"

- **6.5 处理无选项情况（无选项时）**
  - 控制台输出：`第${i + 1}轮问诊：无选项卡片，回复"不清楚"`
  - 点击输入框
  - 填写："不清楚"
  - 使用`tap()`发送

**步骤7: 验证问诊小结和转医生**
- **7.1 验证健康小结**
  - **断言:** 验证"健康小结"可见（超时15秒）
  - **业务含义:** AI根据问诊信息生成健康分析

- **7.2 验证转接提示**
  - **断言:** 验证"免费为您转至相关科室"可见
  - **业务含义:** 系统判定需要专业医生诊断

- **7.3 验证医生信息**
  - **断言:** 验证"主任医师"可见
  - **业务含义:** 显示即将服务的医生职称

- **7.4 验证医生接入**
  - **断言:** 验证"为您服务"可见
  - **业务含义:** 医生已成功接入对话

**关键技术要点总结:**
1. **移动端适配:** 所有点击操作使用`tap()`而非`click()`
2. **智能等待:** 使用`Promise.race()`并行等待多个可能条件
3. **动态选项识别:** 不依赖预定义列表，动态查找页面元素
4. **随机选择:** 单选选1个，多选选2个，随机打乱索引
5. **容错处理:** 每个关键操作都有`.catch(() => false)`避免测试中断
6. **循环保护:** 最多20轮避免无限循环
7. **详细日志:** 每步都有console.log输出便于调试