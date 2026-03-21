// spec: plan/transfer_to_doctor.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

import { IMBaseFlow } from '../shared/im-base';

test.describe('购买处方药转医生', () => {
  test('购买处方药转医生流程验证', async ({ page }) => {
    const im = await IMBaseFlow.openNewConversation(page);

    // 4. 输入"我要买依折麦布片"并发送
    await im.sendMessage('我要买依折麦布片');

    // 验证对话下面有AI回复的药品介绍
    await expect(page.getByText('依折麦布片').first()).toBeVisible({ timeout: 30000 });

    // 验证AI回复有一句话包含"】为您服务"
    await expect(page.getByText('】为您服务')).toBeVisible({ timeout: 15000 });
  });
});
