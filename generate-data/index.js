const generateChromeData = require('./chrome/chrome');
const generateOperaData = require('./opera/opera');
const generateFirefoxData = require('./firefox/firefox');

(async () => {
    // await generateChromeData();
    // await generateOperaData();
    await generateFirefoxData();
})();
