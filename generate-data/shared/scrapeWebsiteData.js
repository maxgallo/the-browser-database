const puppeteer = require('puppeteer');
const constants = require('../constants');
const { addUtilsToWindow } = require('./utils');

async function scrapeWesiteData({
    url,
    waitForSelector,
    scraper
}) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector(waitForSelector);

    await page.evaluate(addUtilsToWindow);
    // To remember:  Second param must be serializable (eg. no function)
    const data = await page.evaluate(scraper, { constants });

    await browser.close();

    return data;
}

module.exports = scrapeWesiteData;
