const path = require('path');

const scrapeGeckoData = require('./scrapeGeckoData');
const scrapeFirefoxData = require('./scrapeFirefoxData');
const scrapeWebsiteData = require('../shared/scrapeWebsiteData');
const addGeckoData = require('./addGeckoData');
const writeJsonFile = require('../shared/writeJsonFile');
const { dataFilePath } = require('../config');

async function generateOperaData() {
    const firefoxData = await scrapeWebsiteData({
        url: 'https://en.wikipedia.org/wiki/Firefox_version_history',
        waitForSelector: 'table.wikitable',
        scraper: scrapeFirefoxData,
    });

    const geckoData = await scrapeWebsiteData({
        url: 'https://developer.mozilla.org/en-US/docs/Mozilla/Gecko/Versions',
        waitForSelector: '.standard-table',
        scraper: scrapeGeckoData,
    })

    // TODO: SM gecko versions from https://en.wikipedia.org/wiki/SpiderMonkey

    const firefoxAndGeckData = addGeckoData(firefoxData, geckoData);

    console.dir(firefoxAndGeckData);
    // writeJsonFile(firefoxData, path.resolve(dataFilePath, 'firefox.json'));
}

module.exports = generateOperaData;
