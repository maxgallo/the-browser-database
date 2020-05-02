const puppeteer = require('puppeteer');
const constants = require('../constants');

async function scrapeWesiteData({
    url,
    waitForSelector,
    scraper
}) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector(waitForSelector);

    const data = await page.evaluate(scraper, { constants });

    await browser.close();

    return data;
}

module.exports = scrapeWesiteData;
