// spec: test_case/conversation_management/conversation_management.md
// seed: seed.spec.ts

import { expect, test } from '@playwright/test';

import { IMBaseFlow } from '../shared/im-base';

test.describe('对话管理场景验证', () => {
  test('历史对话删除（最多20个）', async ({ page }) => {
    const historyMessage = '历史删除测试';

    // 1. 访问登录并跳转到 IM 页面
    // 2. 等待页面完全加载
    // 3. 新开启对话
    const im = await IMBaseFlow.openNewConversation(page);
    // historyTitle 用 .last() 取非 sticky 栏（sticky 栏在未滚动时尺寸为 0）
    const historyTitle = im.historyDrawer.getByText('对话记录', { exact: true }).last();
    const cancelButton = im.historyDrawer.getByText('取消', { exact: true });
    // 选中历史条目后按钮文字从"删除"变为"删除(1)"，用正则匹配以兼容两种状态
    const deleteButton = im.historyDrawer.getByText(/^删除/);

    // 4. 首先发送消息，再新开对话（将旧对话保入历史）
    await im.sendMessage(historyMessage);
    await im.newChatButton.click();
    await expect(im.greeting).toBeVisible({ timeout: 15000 });

    // 点击右上觓历史图标（三条横线按钮）打开历史对话列表
    await page.locator('.header-right-icon.history-icon').click();

    // 5. 点击管理这个按钮，进入对话编辑页面
    // 6. 选中第一条历史对话，并且保存当前历史对话标题信息
    // 7. 点击删除对话按钮
    await expect(im.historyDrawer).toBeVisible();
    await expect(historyTitle).toBeVisible();

    const historyRecord = im.historyDrawer.getByText(historyMessage).first();
    await expect(historyRecord).toBeVisible({ timeout: 15000 });
    // 删除前内容可能有多条，先记录初始数量，验证删除后数量减 1
    const initialCount = await im.historyDrawer.getByText(historyMessage).count();

    await expect(im.historyManageButton.last()).toBeVisible();
    await im.historyManageButton.last().click();
    await expect(cancelButton).toBeVisible();
    await expect(deleteButton).toBeVisible();

    await historyRecord.click();
    await deleteButton.click();

    const confirmDeleteButton = page.getByText('删除', { exact: true }).last();
    if (await confirmDeleteButton.isVisible().catch(() => false)) {
      await confirmDeleteButton.click();
    }

    // 验证对话数量减 1（删除成功）
    await expect(im.historyDrawer.getByText(historyMessage)).toHaveCount(initialCount - 1, { timeout: 15000 });
  });
});