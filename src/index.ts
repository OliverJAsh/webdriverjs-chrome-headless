import * as webdriver from 'selenium-webdriver';
import * as chromeDriver from 'selenium-webdriver/chrome';

const { By, until } = webdriver;

// Use async/await instead of built in promise manager.
webdriver.promise.USE_PROMISE_MANAGER = false;

// Headless is supported in Chrome >= 58. Not currently stable, so using dev
// build.
const CHROME_BIN_PATH = '/Applications/Google Chrome Dev.app/Contents/MacOS/Google Chrome';

const options = new chromeDriver.Options();
options.setChromeBinaryPath(CHROME_BIN_PATH);
options.addArguments(
    'headless',
    // Use --disable-gpu to avoid an error from a missing Mesa library, as per
    // https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
    'disable-gpu',
);

const main = async () => {
    const driver = await new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver');
    await driver.findElement(By.name('btnG')).click();
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);

    const title = await driver.findElement(By.css('title')).getAttribute('innerHTML');
    console.log({ title });

    await driver.quit();
};

main();
