const chromeDataScraper = require('./scrapers/chrome');
const downloadBrowserData = require('./downloadBrowserData');


(async () => {
    const chromeData = await downloadBrowserData(chromeDataScraper);
    console.dir(chromeData);
})();
