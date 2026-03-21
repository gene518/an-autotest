# AI自动化测试项目提示词

## 📋 项目概述

这是基于健康界(jk.cn)平台AI医生IM聊天功能的自动化测试项目，使用Playwright框架进行端到端测试。

**核心目标**: 确保AI医生IM聊天功能在各种场景下的稳定性和用户体验质量。

## 🎯 关键要求

### 测试环境配置
- **设备模拟**: iPhone 14 Pro Max (645×1398像素)
- **浏览器**: 非headless模式运行 (必须可视化执行)
- **多浏览器支持**: Chromium, Firefox, WebKit
- **录制要求**: 完整截图 + 视频录制 + 操作追踪

### IM 用例复用规范
1. **所有业务测试用例都必须以“访问 IM 并开启新对话”作为统一前置步骤**
2. **以下步骤禁止在各个 spec 中重复手写**：访问登录链接、等待 IM 页面加载、校验顶部导航、校验输入框、点击右上角开启新对话按钮
3. 上述高频前置统一收敛到基础类 [test_case/shared/im-base.ts](test_case/shared/im-base.ts)
4. **只有同一个操作方法在 5 个以上用例中重复出现，才允许进入基础类**，避免过度封装
5. 新增业务用例优先复用基础类中的高频方法；低频动作保留在具体 spec 中直接编排
6. 如果“登录方式 / 页面加载校验 / 新对话按钮定位 / 欢迎话术断言”发生变化，只允许修改基础类 [test_case/shared/im-base.ts](test_case/shared/im-base.ts)
7. [test_case/welcome_message/welcome_message.spec.ts](test_case/welcome_message/welcome_message.spec.ts) 是该公共前置的专项验证用例，其他业务用例不得复制前置实现

### 基础类调用示例
```typescript
import { IMBaseFlow } from '../shared/im-base';

test('业务场景', async ({ page }) => {
	const im = await IMBaseFlow.openNewConversation(page);
	await im.sendMessage('我要买红霉素软膏');
});
```

### 代码编写操作要求
1. **发送规则**: 输入框发送文本不要使用 Enter，必须通过发送按钮发送
2. **移动端点击规则**: 发送按钮统一使用 `tap()`，不要用 `click()` 触发发送
3. **操作重试策略**: 同一种方式最多尝试两次；仍失败时必须分析页面并改用新方案
4. **实现原则**: 所有操作必须模拟真实用户行为，禁止使用 `page.evaluate()` 直接触发 DOM 行为
5. **封装规则**: 达到复用阈值的高频操作必须走基础类；低频动作保留在业务用例中

### 测试结构原则
1. **计划驱动**: 所有测试用例必须基于 `plan/` 目录中的测试计划文档
2. **分层组织**: 按测试计划创建对应目录，按测试套件进一步分组
3. **职责分层**: 基础类只承载高频公共操作；spec 文件只保留场景编排、断言和低频业务步骤
4. **禁止复制**: 多个 spec 中不得复制同一段前置流程或发送流程

## 📁 目录结构约定

```
project/
├── plan/                               # 测试计划文档目录
│   ├── enhanced-test-plan-updated.md   # 综合功能测试计划
│   ├── transfer_to_doctor.md           # 转医生场景测试计划
│   └── ...                             # 其他测试计划
├── seed.spec.ts                        # 测试初始化脚本(项目根目录)
├── test_case/                          # 测试用例实现目录
│   ├── shared/                         # 公共基础能力
│   │   └── im-base.ts                  # IM 高频复用操作
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
npx playwright test test_case/transfer_to_doctor
# 单个测试
npx playwright test test_case/transfer_to_doctor/a_otc_to_doctor.spec.ts
```

### 测试报告要求
- **截图**: 每个关键步骤保存截图
- **视频**: 完整测试过程录制

---

**重要提醒**: 
- 必须在非headless模式下运行以确保真实用户体验
- 所有测试必须基于已有的测试计划文档
- 保持详细日志输出，便于问题定位和调试
- 确保截图和视频录制覆盖完整测试过程

## 🔧 技术实现要求

#### ✅ 推荐：`page.click()` / `page.fill()` / `page.press()` / `page.hover()` / `page.getByRole()` / `page.locator()` / `page.keyboard.press()` / `page.tap()`

> **重要说明**：jk.cn 的 AI 医生 IM 页面是移动端网页，发送按钮 `span.chat-send-btn` 监听的是触摸事件。
> - `click()` 方法无法触发发送
> - `tap()` 方法可以正确模拟触摸点击，且会在 trace 中记录完整操作

#### ❌ 禁止：`page.evaluate(() => element.click())` / `page.evaluate(() => dispatchEvent())` / `page.evaluate(() => submit())` 等任何通过evaluate直接操作DOM的方式
