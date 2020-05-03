const generateChromeData = require('./chrome/chrome');
const generateOperaData = require('./opera/opera');
const generateFirefoxData = require('./firefox/firefox');
const generateEdgeData = require('./edge/edge');

(async () => {
    await generateChromeData();
    await generateOperaData();
    await generateFirefoxData();
    await generateEdgeData();
})();
