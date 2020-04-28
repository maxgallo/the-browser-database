const puppeteer = require('puppeteer');

async function downloadBrowserData(scraper) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(scraper.url);

    await page.waitForSelector(scraper.waitForSelector);

    const parsedData = await page.evaluate(scraper.parse);

    await browser.close();

    return parsedData;
}

module.exports = downloadBrowserData;
