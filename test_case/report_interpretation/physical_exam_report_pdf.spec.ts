// spec: test_case/report_interpretation/report_interpretation.md
// seed: seed.spec.ts

import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '../shared/base-test';
import { IMBaseFlow } from '../shared/im-base';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test.describe('报告解读场景验证', () => {
  test('体检报告解读 - PDF格式', async ({ page }) => {
    test.setTimeout(120000);

    // 1. 访问登录并跳转到IM页面
    const im = await IMBaseFlow.openNewConversation(page);

    // 2. 点击右下角加号按钮，进入拍照/上传页面
    await page.locator('.chat-add-btn').click();

    // 点击拍报告tab，切换到拍报告上传界面
    await page.locator('.pop-up-box.active').getByText('拍报告', { exact: true }).click();

    // expect: 拍照页面提示支持体检报告
    await expect(page.locator('.pop-up-box.active').getByText(/体检报告/)).toBeVisible();

    // 3. 上传PDF格式体检报告文件 test_data/四大.pdf
    // 点击PDF文件按钮并上传PDF文件
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('.pop-up-box.active').getByRole('button', { name: 'Choose File' }).nth(0).click(),
    ]);
    await fileChooser.setFiles(path.join(__dirname, '../../test_data/四大.pdf'));

    // expect: PDF文件上传成功，PDF自动发送并在对话中展示
    await expect(page.getByText(/PDF报告/)).toBeVisible({ timeout: 15000 });

    // expect: 显示正在解读中的等待提示
    await expect(page.getByText('报告正在解读中...')).toBeVisible({ timeout: 15000 });
    // expect: 输入框锁定，显示正在解读
    await expect(page.getByText(/正在为您解读中/)).toBeVisible();

    // 4. 等待AI解析报告
    // expect: AI返回PDF报告解读内容，解读内容包含关键指标分析
    await expect(page.getByText(/报告单|报告解读/).first()).toBeVisible({ timeout: 60000 });
  });
});
