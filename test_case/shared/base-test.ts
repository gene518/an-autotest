import { test as base } from '@playwright/test';

// 扩展默认 test，所有用例执行完成后等待 3 秒再关闭页面，方便结果校验
export const test = base.extend({
  page: async ({ page }, use) => {
    await use(page);
    await page.waitForTimeout(3000);
  },
});

export { expect } from '@playwright/test';
