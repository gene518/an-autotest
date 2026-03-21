// spec: plan/transfer_to_doctor.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

import { IMBaseFlow } from '../shared/im-base';

test.describe('积分转人工', () => {
  test('积分转人工转医生流程验证', async ({ page }) => {
    // 设置测试超时为5分钟
    test.setTimeout(300000);
    const im = await IMBaseFlow.openNewConversation(page);

    // 5. 循环发送消息直到触发转医生流程
    const message = '硼酸洗剂如何使用';
    const maxAttempts = 15; // 最多尝试15次
    let transferTriggered = false;
    
    for (let i = 1; i <= maxAttempts; i++) {
      await im.sendMessage(message, { timeout: 3000 });
      
      // 等待AI回复（等待新消息出现）
      await page.waitForTimeout(8000);
      
      // 检查是否触发了转医生流程
      const transferMessage = page.locator('text=/转至.*科室|转至在线医生|免费为您转至/');
      const isTransferred = await transferMessage.count() > 0;
      
      if (isTransferred) {
        transferTriggered = true;
        console.log(`转医生流程在第 ${i} 条消息后触发`);
        break;
      }
    }

    // 验证转医生流程已触发
    expect(transferTriggered).toBe(true);
    
    // 验证1: AI回复包含"转至"相关科室信息
    await expect(page.getByText(/免费为您转至相关科室/)).toBeVisible();
    
    // 验证2: 显示医生信息，内容包含xx科为您服务（使用更宽松的匹配）
    await expect(page.getByText(/主治医师|主任医师|副主任医师/).first()).toBeVisible();
    
    // 等待医生回复
    await page.waitForTimeout(5000);
    
    // 验证3: 医生发送了消息（医生可能会问"什么症状"或"可以帮助"）
    await expect(page.getByText(/什么症状|可以帮助|您好/).nth(1)).toBeVisible({ timeout: 15000 });
  });
});
