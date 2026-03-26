// spec: test_case/operation_capsule/operation_capsule.md
// seed: seed.spec.ts

import { test, expect } from '../shared/base-test';

import { IMBaseFlow } from '../shared/im-base';

test.describe('运营胶囊场景验证', () => {
  test('问诊中隐藏状态', async ({ page }) => {
    test.setTimeout(180000);
    const im = await IMBaseFlow.openNewConversation(page);

    // 1. 输入我要买依折麦布片，触发处方药转医生流程
    await im.sendMessage('我要买依折麦布片');

    // expect: 正常转人工，等待医生加入确认消息
    await expect(page.getByText('我要买依折麦布片', { exact: true })).toBeVisible();
    await expect(page.getByText('】为您服务')).toBeVisible({ timeout: 60000 });

    // expect: 输入框上面是可以点击的胶囊，只剩下个评价胶囊
    await expect(page.getByText('去评价')).toBeVisible({ timeout: 30000 });
    await expect(page.getByText('便捷购药')).not.toBeVisible({ timeout: 15000 });
    await expect(page.getByText('微信问医')).not.toBeVisible();

    // 2. 点击评价胶囊
    await page.getByText('去评价').tap();

    // expect: 进入评价页面（URL 包含 evalution）
    await expect(page).toHaveURL(/evalution/i, { timeout: 30000 });

    // 3. 评价内容都是用最高分评价，提交
    // 服务评价：点击最高分"非常满意"
    await page.getByText('非常满意').click();
    // 推荐意愿NPS：点击最高分"10"
    await page.getByText('10', { exact: true }).click();
    // 提交评价
    await page.getByText('立即评论').click();

    // expect: 提交评价，进入评价完成页面
    await expect(page.getByText(/感谢|评价成功|已完成|提交成功/i).first()).toBeVisible({ timeout: 15000 });

    // 4. 点击查看评价
    await page.getByText(/查看评论/).click();

    // expect: 页面显示评价详情（可见已提交的最高分评价内容）
    await expect(page.getByText('非常满意')).toBeVisible({ timeout: 15000 });

    // 5. 点击左上角返回按钮（浏览器测试环境中用 goBack 模拟 in-app 原生返回行为）
    await page.goBack();

    // expect: 返回到im页面
    await expect(page).toHaveURL(/\/im\//, { timeout: 15000 });
    await expect(im.inputBox).toBeVisible();
  });
});
