const path = require('path');

const scrapeChromeData = require('./scrapeChromeData');
const scrapeWebsiteData = require('../utils/scrapeWebsiteData');
const writeJsonFile = require('../utils/writeJsonFile');
const { dataFilePath } = require('../config');


async function generateChromeData() {
    const chromeData = await scrapeWebsiteData({
        url: 'https://en.wikipedia.org/wiki/Google_Chrome_version_history',
        waitForSelector: 'table.wikitable.sortable.jquery-tablesorter',
        scraper: scrapeChromeData,
    });

    writeJsonFile(chromeData, path.resolve(dataFilePath, 'chrome.json'));
}

module.exports = generateChromeData;
