// spec: plan/welcome_message.md
// seed: seed.spec.ts

import { test } from '@playwright/test';

import { IMBaseFlow } from '../shared/im-base';

test.describe('欢迎话术', () => {
  test('开启新对话流程验证', async ({ page }) => {
    await IMBaseFlow.openNewConversation(page);
  });
});
