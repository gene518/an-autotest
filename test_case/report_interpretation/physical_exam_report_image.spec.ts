// spec: test_case/report_interpretation/report_interpretation.md
// seed: seed.spec.ts

import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '../shared/base-test';
import { IMBaseFlow } from '../shared/im-base';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test.describe('报告解读场景验证', () => {
  test('体检报告解读 - 图片格式', async ({ page }) => {
    test.setTimeout(120000);

    // 1. 访问登录并跳转到IM页面
    const im = await IMBaseFlow.openNewConversation(page);

    // 2. 点击右下角加号按钮，进入拍照/上传页面
    await page.locator('.chat-add-btn').click();

    // 点击拍报告tab，切换到拍报告上传界面
    await page.locator('.pop-up-box.active').getByText('拍报告', { exact: true }).click();

    // expect: 拍照页面提示支持体检报告
    await expect(page.locator('.pop-up-box.active').getByText(/体检报告/)).toBeVisible();

    // 3. 上传体检报告图片文件 test_data/体检入职报告_1.jpg
    // 点击相册上传按钮并选择图片文件
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('.pop-up-box.active').getByRole('button', { name: 'Choose File' }).nth(1).click(),
    ]);
    await fileChooser.setFiles(path.join(__dirname, '../../test_data/体检入职报告_1.jpg'));

    // expect: 图片文件上传成功，发送面板出现
    await expect(page.getByText('发送')).toBeVisible({ timeout: 10000 });

    // 等待图片上传完成后再点击发送
    await page.waitForTimeout(3000);

    // 点击发送按钮发送上传的图片
    await page.locator('.pop-up-box.active .c-button-primary').tap();

    // 等待上传面板关闭，确认发送成功
    await expect(page.locator('.pop-up-box.active')).toBeHidden({ timeout: 10000 });

    // expect: 显示正在识别中的等待提示
    await expect(page.getByText(/识别中/)).toBeVisible({ timeout: 15000 });
    // expect: 输入框锁定，显示正在解读
    await expect(page.getByText(/正在为您解读中/)).toBeVisible();

    // 4. 等待AI解析报告
    // expect: AI返回报告解读内容，解读内容包含关键指标分析
    await expect(page.getByRole('heading', { level: 4 }).first()).toBeVisible({ timeout: 60000 });
  });
});
