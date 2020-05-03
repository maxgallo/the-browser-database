const path = require('path');

const scrapeSafariData = require('./scrapeSafariData');
const scrapeWebsiteData = require('../shared/scrapeWebsiteData');
const writeJsonFile = require('../shared/writeJsonFile');
const { dataFilePath } = require('../config');

async function generateOperaData() {
    const safariData = await scrapeWebsiteData({
        url: 'https://en.wikipedia.org/wiki/Safari_version_history',
        waitForSelector: 'table.wikitable',
        scraper: scrapeSafariData,
    });

    writeJsonFile(safariData, path.resolve(dataFilePath, 'safari.json'));
}

module.exports = generateOperaData;
