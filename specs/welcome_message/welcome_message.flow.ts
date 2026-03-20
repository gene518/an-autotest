import { expect, type Locator, type Page } from '@playwright/test';

const LOGIN_URL =
  'https://www.jk.cn/landing_smspassword?appId=1&mobile=16013156866&needRedirect=true&smsPassword=666666&returnUrl=https%3A%2F%2Fwww.jk.cn%2Fturky%2F%3FisImmsersive%3Dtrue%26native_back_button_color%3D0%26update_native_backbtn%3Dtrue%23%2Fim%2F10407%3FaccessEntrance%3DAIKYSRHD%26oneKey%3D1';

const GREETING_PATTERN = /早上好|上午好|下午好|晚上好/;

export type WelcomeMessageContext = {
  header: Locator;
  inputBox: Locator;
  sendButton: Locator;
  newChatButton: Locator;
  greeting: Locator;
};

export async function openNewConversation(page: Page): Promise<WelcomeMessageContext> {
  await page.goto(LOGIN_URL);
  await expect(page).toHaveURL(/\/im\/10407/);
  await expect(page).toHaveTitle('AI医生');

  const header = page.getByRole('banner');
  await expect(header.getByText('对话', { exact: true })).toBeVisible();
  await expect(header.getByText('档案', { exact: true })).toBeVisible();

  const inputBox = page.getByRole('textbox', { name: '有问题尽管问我...' });
  await expect(inputBox).toBeVisible();

  const greeting = page.getByText(GREETING_PATTERN).first();
  await expect(greeting).toBeVisible();

  const newChatButton = page.locator('.header-right-icon.chat-icon');
  await expect(newChatButton).toBeVisible();
  await newChatButton.click();

  await expect(greeting).toBeVisible();
  await expect(inputBox).toBeVisible();

  return {
    header,
    inputBox,
    sendButton: page.locator('span.chat-send-btn'),
    newChatButton,
    greeting,
  };
}