const path = require('path');

const scrapeOperaData = require('./scrapeOperaData');
const scrapeWebsiteData = require('../shared/scrapeWebsiteData');
const writeJsonFile = require('../shared/writeJsonFile');
const { dataFilePath } = require('../config');

async function generateOperaData() {
    const operaData = await scrapeWebsiteData({
        url: 'https://help.opera.com/en/opera-version-history/',
        waitForSelector: '#historyTable',
        scraper: scrapeOperaData,
    });

    writeJsonFile(operaData, path.resolve(dataFilePath, 'opera.json'));
}

module.exports = generateOperaData;
