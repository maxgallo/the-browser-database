const { emptyDirSync } = require('fs-extra');

const generateChromeData = require('./chrome/chrome');
const generateOperaData = require('./opera/opera');
const generateFirefoxData = require('./firefox/firefox');
const generateEdgeData = require('./edge/edge');
const generateSafariData = require('./safari/safari');
const { dataFilePath } = require('./config');

(async () => {
    emptyDirSync(dataFilePath);

    await generateChromeData();
    await generateOperaData();
    await generateFirefoxData();
    await generateEdgeData();
    await generateSafariData();
})();
