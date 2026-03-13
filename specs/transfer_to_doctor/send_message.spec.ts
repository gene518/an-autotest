// spec: plan/transfer_to_doctor.md
// seed: specs/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('积分转人工', () => {
  test('发送消息流程验证', async ({ page }) => {
    // 1. 访问登录URL并自动跳转到IM页面（合并链接）
    await page.goto('https://www.jk.cn/landing_smspassword?appId=1&mobile=16013156866&needRedirect=true&smsPassword=666666&returnUrl=https%3A%2F%2Fwww.jk.cn%2Fturky%2F%3FisImmsersive%3Dtrue%26native_back_button_color%3D0%26update_native_backbtn%3Dtrue%23%2Fim%2F10407%3FaccessEntrance%3DAIKYSRHD%26oneKey%3D1');

    // 3. 验证顶部导航栏显示'对话'标签
    await expect(page.getByText('对话', { exact: true })).toBeVisible();

    // 验证顶部导航栏显示'我的'标签
    await expect(page.getByText('我的', { exact: true })).toBeVisible();

    // 验证聊天输入框正常显示
    const inputBox = page.getByRole('textbox', { name: '有问题尽管问我' });
    await expect(inputBox).toBeVisible();

    // 4. 点击右上角开启新对话图标
    await page.getByRole('button').nth(1).click();

    // 验证显示欢迎话术
    await expect(page.getByText(/^您好/).first()).toBeVisible();

    // 5. 点击输入框准备输入文本
    await inputBox.click();

    // 在输入框填写文本"硼酸洗剂如何使用"
    await inputBox.fill('硼酸洗剂如何使用');

    // 6. 点击发送按钮（使用 CSS locator 定位发送按钮并模拟触摸点击）
    const sendButton = page.locator('span.chat-send-btn');
    await sendButton.tap();

    // 验证消息发送成功 - 输入框被清空
    await expect(inputBox).toHaveValue('');

    // 验证发送的消息出现在对话中（使用 .last() 获取最新发送的消息）
    await expect(page.getByText('硼酸洗剂如何使用').last()).toBeVisible();
  });
});
