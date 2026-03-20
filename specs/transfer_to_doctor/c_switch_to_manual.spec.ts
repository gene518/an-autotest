// spec: plan/transfer_to_doctor.md
// seed: specs/seed.spec.ts

import { test, expect } from '@playwright/test';

import { openNewConversation } from '../welcome_message/welcome_message.flow';

test.describe('转人工转医生', () => {
  test('转人工转医生流程验证', async ({ page }) => {
    const { inputBox, sendButton } = await openNewConversation(page);

    // 4. 对话框输入：转人工
    await inputBox.click();
    await inputBox.fill('转人工');

    // 5. 点击输入框右边的发送按钮（移动端使用 tap 模拟触摸点击）
    await sendButton.waitFor({ state: 'visible' });
    await sendButton.tap();

    // 等待AI回复
    await page.waitForTimeout(10000);

    // 验证输入框清空
    const inputValue = await inputBox.inputValue();
    expect(inputValue).toBe('');

    // 验证输入内容发送到对话中
    await expect(page.getByText('转人工')).toBeVisible();

    // 验证AI回复
    await expect(page.getByText(/我是您的医生朋友|医疗健康相关问题可以咨询我/)).toBeVisible();

    // 等待可能的医生转接
    await page.waitForTimeout(1000);
  });
});