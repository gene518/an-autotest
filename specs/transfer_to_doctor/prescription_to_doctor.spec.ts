// spec: plan/transfer_to_doctor.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('购买处方药转医生', () => {
  test('预期不会展示药品卡片的转医生流程', async ({ page }) => {
    // 1. 访问登录并跳转IM页面（合并链接）
    await page.goto('https://www.jk.cn/landing_smspassword?appId=1&mobile=16013156866&needRedirect=true&smsPassword=666666&returnUrl=https%3A%2F%2Fwww.jk.cn%2Fturky%2F%3FisImmsersive%3Dtrue%26native_back_button_color%3D0%26update_native_backbtn%3Dtrue%23%2Fim%2F10407%3FaccessEntrance%3DAIKYSRHD%26oneKey%3D1');

    // 2. 验证页面加载完成和核心元素
    await expect(page.getByText('对话', { exact: true })).toBeVisible();
    await expect(page.getByText('我的', { exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: '有问题尽管问我...' })).toBeVisible();
    await expect(page.getByText('以上内容由【平安好医生平台】AI大模型生成')).toBeVisible();

    // 3. 点击新对话按钮（右上角对话图标）
    await page.locator('.im-page-new-chat').click();
    await expect(page.locator('.welcome-card-bg__desc').first()).toBeVisible({ timeout: 10000 });

    // 4. 输入需求并发送
    const inputBox = page.getByRole('textbox', { name: '有问题尽管问我' });
    await inputBox.click();
    await inputBox.fill('我要买依折麦布片');

    const sendButton = page.locator('span.chat-send-btn');
    await sendButton.waitFor({ state: 'visible' });
    await sendButton.tap();

    // 5. 验证AI回复
    await expect(page.getByText('依折麦布片').first()).toBeVisible();
    await expect(page.getByText(/免费为您转至相关科室/)).toBeVisible();
    await expect(page.locator('text=为您服务')).toBeVisible();

    // 6. 验证不会展示依折麦布商品卡片
    await expect(page.locator('text=去购买')).toHaveCount(0);
  });
});
