import { defineConfig, devices } from '@playwright/test';

// 获取报告名称（时间戳+用例路径）
const reportName = getReportName();

export default defineConfig({
  testDir: './test_case',                      // 测试用例目录
  outputDir: `test-results/${reportName}/artifacts`,  // 测试产物输出目录（按时间戳+用例路径分组）
  fullyParallel: false,                        // 禁用完全并行，确保测试按顺序执行
  forbidOnly: !!process.env.CI,                // CI环境禁止使用.only
  retries: process.env.CI ? 2 : 0,             // CI环境失败重试2次，本地不重试
  workers: process.env.CI ? 1 : 1,             // 单worker执行，避免并发问题
  reporter: [
    ['html', {                                 // HTML报告配置
      outputFolder: `test-results/${reportName}/html-report`, // HTML报告按时间戳+用例路径分组
      open: 'always'                           // 默认自动打开
    }],
    ['list']                                   // 控制台列表格式输出
  ],
  use: {
    baseURL: 'https://www.jk.cn',              // 基础URL，page.goto('/')会使用此地址
    trace: 'on',                               // 开启操作追踪，用于调试和回放
    screenshot: 'on',                          // 开启截图，记录每个测试状态
    video: 'on',                               // 开启视频录制，记录完整测试过程
    actionTimeout: 30000,                      // 单个操作超时时间30秒
    headless: false,                           // 非无头模式，可视化执行
  },

  projects: [
    {
      name: 'chromium',                        // 项目名称
      use: { 
        // 不使用 devices 预设，避免其携带 defaultBrowserType:'webkit' 导致无法使用本地 Chrome
        viewport: { width: 450, height: 1200 }, // 模拟移动端分辨率
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) CriOS/120.0.0.0 Mobile/15E148 Safari/604.1', // iPhone Chrome UA
        isMobile: true,                        // 开启移动端模拟
        hasTouch: true,                        // 开启触摸事件
        deviceScaleFactor: 3,                  // iPhone 14 Pro Max 像素比
        headless: false,                       // 非无头模式运行
        video: 'on',                           // 开启视频录制
        launchOptions: {
          executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // 使用本地 Chrome
          // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // windoww用本地 Chrome
          slowMo: 1000,                        // 每个操作间隔1秒，便于观察
        },
      },
    },
  ],
});

// ============ 报告名称生成相关函数 ============

// 从命令行参数提取测试路径作为报告名称的一部分
function getTestPath() {
  const args = process.argv;
  for (const arg of args) {
    // 匹配 test_case/ 开头的路径
    if (arg.includes('test_case/')) {
      // 提取路径，去掉 test_case/ 前缀和 .spec.ts 后缀
      const match = arg.match(/test_case\/(.+?)(\.spec\.ts)?$/);
      if (match) {
        // 将路径中的 / 替换为 -
        return match[1].replace(/\.spec\.ts$/, '').replace(/\//g, '-');
      }
    }
  }
  return 'all'; // 如果没有指定具体测试，返回 'all'
}

// 生成时间戳 yymmdd-hhmmss 格式（使用环境变量确保整个测试过程使用同一个时间戳）
function getReportName() {
  if (process.env.PW_TEST_REPORT_NAME) {
    return process.env.PW_TEST_REPORT_NAME;
  }
  const now = new Date();
  const ts = [
    String(now.getFullYear()).slice(-2),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    '-',
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0'),
  ].join('');
  const testPath = getTestPath();
  const reportName = `${ts}-${testPath}`;
  process.env.PW_TEST_REPORT_NAME = reportName;
  return reportName;
}
