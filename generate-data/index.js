const generateChromeData = require('./chrome/chrome');
// const chromeDataScraper = require('./scrapers/chrome');
// const operaDataScrape = require('./scrapers/opera');
// const firefoxDataScraper = require('./scrapers/firefox');
// const downloadBrowserData = require('./downloadBrowserData');

(async () => {
    // const chromeData = await downloadBrowserData(chromeDataScraper);
    // console.dir(chromeData);

    // const operaData = await downloadBrowserData(operaDataScrape);
    // console.dir(operaData);
    await generateChromeData();
})();
