// spec: plan/transfer_to_doctor.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

import { IMBaseFlow } from '../shared/im-base';

test.describe('转人工转医生', () => {
  test('转人工转医生流程验证', async ({ page }) => {
    const im = await IMBaseFlow.openNewConversation(page);

    // 4. 对话框输入：转人工
    await im.sendMessage('转人工');

    // 等待AI回复
    await page.waitForTimeout(10000);

    // 验证输入框清空
    const inputValue = await im.inputBox.inputValue();
    expect(inputValue).toBe('');

    // 验证输入内容发送到对话中
    await expect(page.getByText('转人工')).toBeVisible();

    // 验证AI回复
    await expect(page.getByText(/我是您的医生朋友|医疗健康相关问题可以咨询我/)).toBeVisible();

    // 等待可能的医生转接
    await page.waitForTimeout(1000);
  });
});