const engineNames = {
    BLINK: 'Blink',
    EDGE_HTML: 'EdgeHTML',
    GEKO: 'Geko',
    PRESTO: 'Presto',
    TRIDENT: 'Trident',
    WEBKIT: 'WebKit',
    GOANNA: 'Goanna',
    KHTML: 'KHTML',
};

const javascriptEngineNames = {
    V8: 'V8',
    SPIDER_MONKEY: 'SpiderMonkey',
};

const browserNames = {
    CHROME: 'Chrome',
    CHROMIUM: 'Chromium',
    FIREFOX: 'Firefox',
    OPERA: 'Opera',
    SAFARI: 'Safari',
};

// This one matches the following
// 8
// 156
// 15.67
// 1.2.3
// 222.333.444
const versionRegex = '\\d+(\\.\\d+(\\.\\d+)?)?';

module.exports = {
    browserNames,
    engineNames,
    javascriptEngineNames,
    versionRegex,
};
