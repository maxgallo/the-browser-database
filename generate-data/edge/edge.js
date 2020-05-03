
const path = require('path');

const scrapeEdgeData = require('./scrapeEdgeData');
const scrapeWebsiteData = require('../shared/scrapeWebsiteData');
const writeJsonFile = require('../shared/writeJsonFile');
const { dataFilePath } = require('../config');

async function generateOperaData() {
    const edgeData = await scrapeWebsiteData({
        url: 'https://en.wikipedia.org/wiki/Microsoft_Edge',
        waitForSelector: 'table.wikitable',
        scraper: scrapeEdgeData,
    });

    writeJsonFile(edgeData, path.resolve(dataFilePath, 'edge.json'));
}

module.exports = generateOperaData;
