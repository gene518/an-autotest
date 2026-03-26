// spec: test_case/conversation_management/conversation_management.md
// seed: seed.spec.ts

import { expect, test } from '../shared/base-test';

import { IMBaseFlow } from '../shared/im-base';

test.describe('对话管理场景验证', () => {
  test('历史对话查看', async ({ page }) => {
    const historyMessage = '历史查看测试';

    // 1. 访问登录并跳转到 IM 页面
    // 2. 等待页面完全加载
    const im = await IMBaseFlow.openNewConversation(page);
    // historyTitle 用 .last() 取非 sticky 栏（sticky 栏在未滚动时尺寸为 0）
    const historyTitle = im.historyDrawer.getByText('对话记录', { exact: true }).last();
    const historyRecord = im.historyDrawer.getByText(historyMessage).first();

    // 3. 首先发送消息，再新开对话（将旧对话保入历史）
    await im.sendMessage(historyMessage);
    await im.newChatButton.click();
    await expect(im.greeting).toBeVisible({ timeout: 15000 });

    // 点击右上觓历史图标（三条横线按钮）打开历史对话列表
    await page.locator('.header-right-icon.history-icon').click();
    await expect(im.historyDrawer).toBeVisible();
    await expect(historyTitle).toBeVisible();
    await expect(historyRecord).toBeVisible({ timeout: 15000 });
  });
});