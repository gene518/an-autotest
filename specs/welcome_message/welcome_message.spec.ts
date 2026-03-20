// spec: plan/welcome_message.md
// seed: specs/seed.spec.ts

import { test } from '@playwright/test';

import { openNewConversation } from './welcome_message.flow';

test.describe('欢迎话术', () => {
  test('开启新对话流程验证', async ({ page }) => {
    await openNewConversation(page);
  });
});
