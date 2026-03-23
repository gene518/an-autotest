// spec: plan/operation_capsule.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

import { IMBaseFlow } from '../shared/im-base';

test.describe('运营胶囊场景验证', () => {
  test('问诊中隐藏状态', async ({ page }) => {
    const im = await IMBaseFlow.openNewConversation(page);

    // 1. 输入我要依折麦布片，触发处方药转医生流程
    await im.sendMessage('我要依折麦布片');

    // expect: 正常转人工
    await expect(page.getByText('我要依折麦布片', { exact: true })).toBeVisible();

    // expect: 输入框上面是可以点击的胶囊，只剩下个评价胶囊
    await expect(page.getByText('去评价')).toBeVisible({ timeout: 30000 });
    await expect(page.getByText('便捷购药')).not.toBeVisible({ timeout: 15000 });
    await expect(page.getByText('微信问医')).not.toBeVisible();

    // 2. 点击评价胶囊
    await page.getByText('去评价').click();

    // expect: 进入评价页面
    await expect(page).toHaveURL(/evaluate|rate|comment/i, { timeout: 15000 });

    // 3. 评价内容都是用最高分评价，提交
    // 对每个评价项点击最后一个（最高分）星星
    const starGroups = page.locator('.rate-item, .star-wrap, .score-item');
    const groupCount = await starGroups.count();
    for (let i = 0; i < groupCount; i++) {
      await starGroups.nth(i).locator('img, .star, i').last().click();
    }
    await page.getByRole('button', { name: /提交/ }).click();

    // expect: 提交评价，进入评价完成页面
    await expect(page.getByText(/感谢|评价成功|已完成/i)).toBeVisible({ timeout: 15000 });

    // 4. 点击查看评价
    await page.getByText(/查看评价/).click();

    // expect: 页面显示评价详情
    await expect(page.getByText(/我的评价|评价详情|评价内容/i)).toBeVisible({ timeout: 15000 });

    // 5. 点击左上角返回按钮
    await page.goBack();

    // expect: 返回到im页面
    await expect(page).toHaveURL(/\/im\//);
    await expect(im.inputBox).toBeVisible();
  });
});
