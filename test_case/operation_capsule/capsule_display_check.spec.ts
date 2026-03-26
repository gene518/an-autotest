// spec: plan/operation_capsule.md
// seed: seed.spec.ts

import { test, expect } from '../shared/base-test';

import { IMBaseFlow } from '../shared/im-base';

test.describe('运营胶囊场景验证', () => {
  test('胶囊展示检查', async ({ page }) => {
    // 1. 进入im页面
    const im = await IMBaseFlow.openNewConversation(page);

    // expect: 对话下方是运营胶囊，胶囊正常显示在页面中
    // expect: 胶囊内容完整展示
    await expect(page.getByText('便捷购药')).toBeVisible();
    await expect(page.getByText('去评价')).toBeVisible();

    // 2. 点击第一个胶囊
    await page.getByText('便捷购药').click();

    // expect: 点击胶囊后正常跳转，页面展示正常
    await expect(page).toHaveURL(/\/shop\//);
    await expect(page).toHaveTitle('健康商城');
  });
});
