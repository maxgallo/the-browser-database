const path = require('path');

const scrapeGeckoData = require('./scrapeGeckoData');
const scrapeFirefoxData = require('./scrapeFirefoxData');
const scrapeSpiderMonkeyData = require('./scrapeSpiderMonkeyData');
const scrapeWebsiteData = require('../shared/scrapeWebsiteData');
const addDataToFirefox = require('./addDataToFirefox');
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
    });

    const spiderMonkeyData = await scrapeWebsiteData({
        url: 'https://en.wikipedia.org/wiki/SpiderMonkey',
        waitForSelector: 'table.wikitable',
        scraper: scrapeSpiderMonkeyData,
    });

    const firefoxAndGeckData = addDataToFirefox({
        firefoxData,
        firefoxDataPropName: 'engineVersion',
        additionalData: geckoData,
        additionalDataPropName: 'geckoVersion'
    });

    const firefoxAndGeckoAndSpiderMonkeyData = addDataToFirefox({
        firefoxData: firefoxAndGeckData,
        firefoxDataPropName: 'jsEngineVersion',
        additionalData: spiderMonkeyData,
        additionalDataPropName: 'spiderMonkeyVersion'
    });

    writeJsonFile(firefoxAndGeckoAndSpiderMonkeyData, path.resolve(dataFilePath, 'firefox.json'));
}

module.exports = generateOperaData;
