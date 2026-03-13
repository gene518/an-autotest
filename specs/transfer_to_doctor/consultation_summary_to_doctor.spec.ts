// spec: plan/transfer_to_doctor.md
// seed: specs/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('问诊转人工', () => {
  // 设置测试超时时间为2分钟，因为问诊流程需要多轮交互
  test.setTimeout(120000);

  test('问诊转人工转医生流程验证', async ({ page }) => {
    // 1. 访问登录URL并自动跳转到IM页面（合并链接）
    await page.goto('https://www.jk.cn/landing_smspassword?appId=1&mobile=16013156866&needRedirect=true&smsPassword=666666&returnUrl=https%3A%2F%2Fwww.jk.cn%2Fturky%2F%3FisImmsersive%3Dtrue%26native_back_button_color%3D0%26update_native_backbtn%3Dtrue%23%2Fim%2F10407%3FaccessEntrance%3DAIKYSRHD%26oneKey%3D1');

    // 等待页面跳转完成并验证核心元素
    await expect(page.getByText('对话', { exact: true })).toBeVisible();
    await expect(page.getByText('我的', { exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: '有问题尽管问我...' })).toBeVisible();

    // 3. 点击右上角开启新对话图标
    await page.getByRole('button').nth(1).click();
    // 等待欢迎消息出现（使用包含匹配避免多个匹配问题）
    await expect(page.locator('.welcome-card-bg__desc').first()).toBeVisible({ timeout: 10000 });

    // 4. 发送"腹痛怎么办"
    const inputBox = page.getByRole('textbox', { name: '有问题尽管问我' });
    await inputBox.click();
    await inputBox.fill('腹痛怎么办');
    
    // 使用tap()发送消息（移动端必需）
    const sendButton = page.locator('span.chat-send-btn');
    await sendButton.tap();

    // 5. 等待就诊人选择卡片出现并选择第一个就诊人
    console.log('等待就诊人选择卡片...');
    await expect(page.getByText('请问您本次是为谁咨询')).toBeVisible({ timeout: 15000 });
    
    // 点击就诊人（使用tap()因为是移动端页面）
    const patientElement = page.getByText(/\d+岁/).first();
    const patientText = await patientElement.textContent();
    console.log(`准备选择就诊人: ${patientText}`);
    await patientElement.tap();
    
    // 检查是否需要点击发送/确认按钮来提交就诊人选择
    await page.waitForTimeout(1000);
    const hasSendButton = await page.getByRole('button', { name: '发送' }).isVisible().catch(() => false);
    const hasConfirmButton = await page.getByRole('button', { name: '确认' }).isVisible().catch(() => false);
    
    if (hasSendButton) {
      await page.getByRole('button', { name: '发送' }).click();
      console.log('已点击发送按钮提交就诊人');
    } else if (hasConfirmButton) {
      await page.getByRole('button', { name: '确认' }).click();
      console.log('已点击确认按钮提交就诊人');
    } else {
      console.log(`已选择就诊人: ${patientText}`);
    }
    
    // 等待AI开始问诊
    await page.waitForTimeout(2000);

    // 6. 循环回复AI问题直到出现问诊小结或转至医生
    const maxRounds = 20; // 最多循环20轮，防止无限循环
    
    for (let i = 0; i < maxRounds; i++) {
      // 智能等待：等待AI回复出现（最长等待8秒，确保AI有足够时间回复）
      // 等待以下任一条件出现：健康小结、为您服务、选项卡片标识
      try {
        await Promise.race([
          page.getByText('健康小结').waitFor({ state: 'visible', timeout: 8000 }),
          page.getByText('为您服务').waitFor({ state: 'visible', timeout: 8000 }),
          page.getByText('其他，可以打字告诉我').waitFor({ state: 'visible', timeout: 8000 }),
          page.locator('h3:has-text("单选")').waitFor({ state: 'visible', timeout: 8000 }),
          page.locator('h3:has-text("多选")').waitFor({ state: 'visible', timeout: 8000 }),
        ]);
      } catch (error: any) {
        // 检查页面是否被关闭
        if (error.message?.includes('closed') || error.message?.includes('detached')) {
          console.log('页面已关闭或导航离开，退出循环');
          break;
        }
        // 超时说明AI还没回复完，等待3秒后继续
        await page.waitForTimeout(3000);
      }

      // 检查是否完成问诊（健康小结或转医生）
      const summaryVisible = await page.getByText('健康小结').isVisible().catch(() => false);
      const transferVisible = await page.getByText('为您服务').isVisible().catch(() => false);
      
      if (summaryVisible || transferVisible) {
        console.log(`问诊在第${i + 1}轮结束`);
        break;
      }

      // 检查是否有选项卡片（多种识别方式）
      const hasOtherOption = await page.getByText('其他，可以打字告诉我').isVisible().catch(() => false);
      const hasSingleChoice = await page.locator('h3:has-text("单选")').isVisible().catch(() => false);
      const hasMultiChoice = await page.locator('h3:has-text("多选")').isVisible().catch(() => false);
      const hasOptionCard = hasOtherOption || hasSingleChoice || hasMultiChoice;

      if (hasOptionCard) {
        console.log(`第${i + 1}轮问诊：发现选项卡片，开始随机选择选项`);
        
        let totalSelected = 0;
        
        // 查找所有选项组标题（h3元素）
        const optionGroupTitles = page.locator('h3:has-text("单选"), h3:has-text("多选")');
        const groupCount = await optionGroupTitles.count();
        console.log(`  - 发现 ${groupCount} 个选项组`);
        
        for (let g = 0; g < groupCount; g++) {
          const groupTitle = optionGroupTitles.nth(g);
          const titleText = await groupTitle.textContent().catch(() => '');
          const isSingleChoice = titleText?.includes('单选');
          const selectCount = isSingleChoice ? 1 : 2; // 单选选1个，多选选2个
          
          console.log(`  - 选项组${g + 1}: "${titleText}" (${isSingleChoice ? '单选' : '多选'}，选${selectCount}个)`);
          
          // 获取该选项组的父容器
          const groupContainer = groupTitle.locator('..');
          
          // 在选项组容器内查找所有选项按钮/项
          // 尝试多种可能的选项选择器
          const allOptionsInGroup = groupContainer.locator('div[class*="chat-option"], div[class*="option-item"], span[class*="option"], button[class*="option"]');
          
          const optionCount = await allOptionsInGroup.count();
          console.log(`    - 该组共有 ${optionCount} 个选项`);
          
          if (optionCount === 0) {
            console.log(`    - 未找到选项，跳过此组`);
            continue;
          }
          
          // 生成随机索引
          const availableIndices = Array.from({ length: optionCount }, (_, idx) => idx);
          const shuffledIndices = availableIndices.sort(() => Math.random() - 0.5);
          
          let groupSelectedCount = 0;
          for (const idx of shuffledIndices) {
            if (groupSelectedCount >= selectCount) break;
            
            try {
              const option = allOptionsInGroup.nth(idx);
              const isVisible = await option.isVisible().catch(() => false);
              
              if (isVisible) {
                const optionText = await option.textContent().catch(() => '选项');
                await option.click();
                console.log(`    - 随机选择索引${idx}: ${optionText?.trim()}`);
                groupSelectedCount++;
                totalSelected++;
                await page.waitForTimeout(200);
              }
            } catch (e) {
              console.log(`    - 选择索引${idx}失败，继续下一个`);
            }
          }
        }
        
        console.log(`  - 共选择了 ${totalSelected} 个问诊选项`);
        
        // 等待发送按钮出现并点击
        try {
          const submitButton = page.getByRole('button', { name: '发送' });
          await submitButton.waitFor({ state: 'visible', timeout: 5000 });
          await submitButton.click();
          console.log(`  - 成功提交选项`);
        } catch (e) {
          console.log(`  - 发送按钮未出现，改为文本回复`);
          // 安全的文本输入，添加重试机制
          try {
            const textInput = page.getByRole('textbox', { name: '有问题尽管问我' });
            await textInput.waitFor({ state: 'visible', timeout: 5000 });
            await textInput.click();
            await textInput.fill('不清楚');
            const sendBtn = page.locator('span.chat-send-btn');
            await sendBtn.tap();
          } catch (inputError) {
            console.log('文本输入也失败，跳过此轮');
          }
        }
      } else {
        // 无选项卡片：输入"不清楚"并发送
        console.log(`第${i + 1}轮问诊：无选项卡片，回复"不清楚"`);
        const textInput = page.getByRole('textbox', { name: '有问题尽管问我' });
        await textInput.click();
        await textInput.fill('不清楚');
        
        const sendBtn = page.locator('span.chat-send-btn');
        await sendBtn.tap();
      }
    }

    // 7. 验证问诊小结和转医生相关内容
    await expect(page.getByText('健康小结')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('免费为您转至相关科室')).toBeVisible();
    await expect(page.getByText('主任医师')).toBeVisible();
    await expect(page.getByText('为您服务')).toBeVisible();
  });
});
