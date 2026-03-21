import { expect, type Locator, type Page } from '@playwright/test';

const LOGIN_URL =
  'https://www.jk.cn/landing_smspassword?appId=1&mobile=16013156866&needRedirect=true&smsPassword=666666&returnUrl=https%3A%2F%2Fwww.jk.cn%2Fturky%2F%3FisImmsersive%3Dtrue%26native_back_button_color%3D0%26update_native_backbtn%3Dtrue%23%2Fim%2F10407%3FaccessEntrance%3DAIKYSRHD%26oneKey%3D1';

const GREETING_PATTERN = /早上好|上午好|下午好|晚上好/;

type SendMessageOptions = {
  ensureMessageVisible?: boolean;
  timeout?: number;
};

// IMBaseFlow 只保留高频复用的方法。
// 当前收敛规则：同一个操作方法在 5 个以上用例中复用，才进入基础类。
export class IMBaseFlow {
  // 顶部导航区域，用于页面基础状态校验。
  readonly header: Locator;

  // 聊天输入框，所有文本问答场景都会复用。
  readonly inputBox: Locator;

  // 发送按钮固定使用 tap，避免移动端 touch 事件失效。
  readonly sendButton: Locator;

  // 右上角“新对话”按钮，低频场景直接在 spec 中操作该定位器。
  readonly newChatButton: Locator;

  // 欢迎话术节点，用于判断新会话是否初始化完成。
  readonly greeting: Locator;

  // 历史对话抽屉，低频历史管理场景直接在 spec 中组合使用。
  readonly historyDrawer: Locator;

  // 历史对话管理入口，保留为定位器，不单独封装成方法。
  readonly historyManageButton: Locator;

  constructor(private readonly page: Page) {
    this.header = page.getByRole('banner');
    this.inputBox = page.getByRole('textbox', { name: '有问题尽管问我...' });
    this.sendButton = page.locator('span.chat-send-btn');
    this.newChatButton = page.locator('.header-right-icon.chat-icon');
    this.greeting = page.getByText(GREETING_PATTERN).first();
    this.historyDrawer = page.locator('.history-chat-drawer');
    this.historyManageButton = page.locator('.history-chat-title-right');
  }

  static async openNewConversation(page: Page): Promise<IMBaseFlow> {
    const flow = new IMBaseFlow(page);
    await flow.openImPage();
    await expect(flow.newChatButton).toBeVisible();
    await flow.newChatButton.click();
    await flow.assertConversationReady();
    return flow;
  }

  // 打开 IM 页面并完成基础加载校验。
  // 注意：不在此处校验欢迎话术，因为页面可能恢复上次对话（医生会话等无欢迎话术）。
  // 欢迎话术在 assertConversationReady（newChatButton 点击后）中统一验证。
  private async openImPage(): Promise<void> {
    await this.page.goto(LOGIN_URL);
    await this.page.waitForTimeout(5000);
    await expect(this.page).toHaveURL(/\/im\/10407/);
    await expect(this.page).toHaveTitle('AI医生');
    await expect(this.header.getByText('对话', { exact: true })).toBeVisible();
    await expect(this.header.getByText('档案', { exact: true })).toBeVisible();
    await expect(this.inputBox).toBeVisible();
  }

  // 校验当前页面已回到新会话初始态。
  private async assertConversationReady(): Promise<void> {
    await expect(this.greeting).toBeVisible();
    await expect(this.inputBox).toBeVisible();
  }

  // 高频操作：输入消息并通过发送按钮发送。
  async sendMessage(message: string, options: SendMessageOptions = {}): Promise<void> {
    const { ensureMessageVisible = true, timeout = 30000 } = options;

    await this.inputBox.click();
    await this.inputBox.fill(message);
    await this.sendButton.waitFor({ state: 'visible', timeout });
    await this.sendButton.tap();

    if (ensureMessageVisible) {
      await expect(this.page.getByText(message, { exact: true })).toBeVisible({ timeout });
    }
  }
}