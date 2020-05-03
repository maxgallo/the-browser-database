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

    page.on('console', msg => {
        for (let i = 0; i < msg._args.length; ++i)
            console.log(`${i}: ${msg._args[i]}`);
    });

    await page.evaluate(addUtilsToWindow);
    // To remember:  Second param must be serializable (eg. no function)
    const data = await page.evaluate(scraper, { constants });

    await browser.close();

    return data;
}

module.exports = scrapeWesiteData;
