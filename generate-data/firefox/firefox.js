const path = require('path');

const scrapeFirefoxData = require('./scrapeFirefoxData');
const scrapeWebsiteData = require('../shared/scrapeWebsiteData');
const writeJsonFile = require('../shared/writeJsonFile');
const { dataFilePath } = require('../config');

async function generateOperaData() {
    const firefoxData = await scrapeWebsiteData({
        url: 'https://en.wikipedia.org/wiki/Firefox_version_history',
        waitForSelector: 'table.wikitable',
        scraper: scrapeFirefoxData,
    });

    // TODO: download gecko versions from https://developer.mozilla.org/en-US/docs/Mozilla/Gecko/Versions
    // TODO: download gecko versions from https://en.wikipedia.org/wiki/SpiderMonkey

    writeJsonFile(firefoxData, path.resolve(dataFilePath, 'firefox.json'));
}

module.exports = generateOperaData;
