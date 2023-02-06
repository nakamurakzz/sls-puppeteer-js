const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

exports.handler = async (event) => {
  await chromium.font(
    "https://raw.githack.com/minoryorg/Noto-Sans-CJK-JP/master/fonts/NotoSansCJKjp-Regular.ttf"
  );
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true, //chromium.headless, false：デバッグモード、ブラウザを立ち上げる
    devtools: false, //chromium.devtools, true：デバッグモード、開発者ツールを開く
    ignoreHTTPSErrors: true,
    timeout: 30000,
  });
  const page = await browser.newPage();
  await page.emulateTimezone("Asia/Tokyo");
  try {

    await page.goto("https://www.google.com/", {
      waitUntil: "networkidle2",
    });

    // page内の要素を取得
    const title = await page.title();

    return { title, error: null };
  } catch (err) {
    console.error(err);
    return { url: null, error: err.message };
  } finally {
    if (browser != null) {
      await browser.close();
    }
  }
};
