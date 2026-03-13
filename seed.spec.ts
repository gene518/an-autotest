import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    //进入被测页面
    await page.goto('https://www.jk.cn/landing_smspassword?appId=1&mobile=16013156866&needRedirect=true&smsPassword=666666&returnUrl=https%3A%2F%2Fwww.jk.cn%2Fturky%2F%3FisImmsersive%3Dtrue%26native_back_button_color%3D0%26update_native_backbtn%3Dtrue%23%2Fim%2F10407%3FaccessEntrance%3DAIKYSRHD%26oneKey%3D1');
  });
});
