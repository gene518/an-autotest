# AI自动化测试项目提示词

## 📋 项目概述

这是基于健康界(jk.cn)平台AI医生IM聊天功能的自动化测试项目，使用Playwright框架进行端到端测试。

**核心目标**: 确保AI医生IM聊天功能在各种场景下的稳定性和用户体验质量。

## 🎯 关键要求

### 测试环境配置
- **设备模拟**: iPhone 14 Pro Max (430×932像素)
- **浏览器**: 非headless模式运行 (必须可视化执行)
- **多浏览器支持**: Chromium, Firefox, WebKit
- **录制要求**: 完整截图 + 视频录制 + 操作追踪

### 用例起始步骤复用标准
1. **所有业务测试用例在执行开始时，必须先执行“访问 IM 并开启新对话”公共步骤**
2. **禁止**在各个测试文件中重复手写以下前置步骤：访问登录链接、等待 IM 页面加载、校验顶部导航、校验输入框、点击右上角开启新对话按钮
3. 公共步骤统一复用 [specs/welcome_message/welcome_message.flow.ts](specs/welcome_message/welcome_message.flow.ts) 中的 `openNewConversation(page)`
4. [specs/welcome_message/welcome_message.spec.ts](specs/welcome_message/welcome_message.spec.ts) 是该公共步骤的专项验证用例；其他业务用例不得复制其中的前置实现代码，只能调用公共方法
5. 后续如果“登录方式 / 页面加载校验 / 新对话按钮定位 / 欢迎话术断言”发生变化，只允许修改这一处公共步骤，并由所有业务用例自动继承

**业务操作简述：**
- 用例开始先调用 `openNewConversation(page)`，完成登录、进入 IM、校验页面并开启新对话
- 业务用例只继续编写“发送什么内容、验证什么结果”这部分逻辑
- 不要在业务用例里重复实现前置步骤代码

### 代码编写操作要求
1. **输入框发送方式**: 输入框发送文本不要使用Enter键发送，必须使用输入文本后输入框的发送按钮发送
2. **操作重试策略**: 如果过程中一种操作方式卡住了，要整体分析页面，然后尝试新的办法再试。同一个方法试过两次还失败，则使用新方案重试
3. **核心原则**: 所有操作必须模拟真实用户行为，避免使用JavaScript代码直接触发

### 测试结构原则
1. **计划驱动**: 所有测试用例必须基于 `plan/` 目录中的测试计划文档
2. **分层组织**: 按测试计划创建对应目录，按测试套件进一步分组
3. **公共步骤复用**: 跨用例重复的公共前置流程必须抽到共享方法，优先复用“开启新对话”公共步骤，不允许在多个 spec 中复制同一段前置代码

## 📁 目录结构约定

```
project/
├── plan/                               # 测试计划文档目录
│   ├── enhanced-test-plan-updated.md   # 综合功能测试计划
│   ├── transfer_to_doctor.md           # 转医生场景测试计划
│   └── ...                             # 其他测试计划
├── specs/                              # 测试用例实现目录
│   ├── seed.spec.ts                    # 测试初始化脚本(根目录)
│   ├── {plan-name}/                    # 按测试计划分组
│   │   ├── README.md                   # 测试套件说明
│   │   ├── {test-suite}/               # 按测试套件进一步分组
│   │   │   └── *.spec.ts               # 具体测试用例
│   │   └── ...                         # 其他测试套件
│   └── ...                             # 其他测试计划目录
└── ...                                 # 项目其他文件
```

## 📊 测试执行要求

### 运行命令模式
```bash
# 按计划执行
npx playwright test specs/enhanced-plan
npx playwright test specs/transfer-doctor-plan

# 按套件执行  
npx playwright test specs/enhanced-plan/chat
npx playwright test specs/enhanced-plan/auth

# 单个测试
npx playwright test specs/enhanced-plan/auth/login-authentication.spec.ts
```

### 测试报告要求
- **截图**: 每个关键步骤保存截图
- **视频**: 完整测试过程录制

---

**重要提醒**: 
- 必须在非headless模式下运行以确保真实用户体验
- 所有测试必须基于已有的测试计划文档
- 保持详细的日志输出便于问题定位和调试
- 确保截图和视频录制完整覆盖测试过程

## 🔧 技术实现要求

#### ✅ 推荐：`page.click()` / `page.fill()` / `page.press()` / `page.hover()` / `page.getByRole()` / `page.locator()` / `page.keyboard.press()` / `page.tap()`

**发送按钮点击示例（移动端必须使用 tap）**：
```typescript
// 移动端页面的发送按钮必须使用 tap() 方法模拟触摸点击，因为移动端网页监听的是 touch 事件而非 click 事件
const sendButton = page.locator('span.chat-send-btn');
await sendButton.waitFor({ state: 'visible' });
await sendButton.tap();  // 使用 tap() 而不是 click()
```

> **重要说明**：jk.cn 的 AI 医生 IM 页面是移动端网页，发送按钮 `span.chat-send-btn` 监听的是触摸事件。
> - `click()` 方法无法触发发送
> - `tap()` 方法可以正确模拟触摸点击，且会在 trace 中记录完整操作

#### ❌ 禁止：`page.evaluate(() => element.click())` / `page.evaluate(() => dispatchEvent())` / `page.evaluate(() => submit())` 等任何通过evaluate直接操作DOM的方式
