// spec: plan/transfer_to_doctor.md
// seed: specs/seed.spec.ts

import { test, expect } from '@playwright/test';

import { openNewConversation } from '../welcome_message/welcome_message.flow';

test.describe('购买非处方药转医生', () => {
  test('购买非处方药转医生流程验证', async ({ page }) => {
    const { inputBox, sendButton } = await openNewConversation(page);

    // 4. 输入"我要买红霉素软膏"并发送
    await inputBox.click();
    await inputBox.fill('我要买红霉素软膏');
    await sendButton.waitFor({ state: 'visible' });
    await sendButton.tap();
    // 验证对话下面有AI回复的药品介绍（使用部分匹配）
    await expect(page.getByText('红霉素软膏').first()).toBeVisible({ timeout: 30000 });

    // 验证AI回复有一句话包含"】为您服务"
    await expect(page.getByText('】为您服务')).toBeVisible({ timeout: 15000 });
    });
});