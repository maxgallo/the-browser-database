const { javascriptEngineNames, maintainerNames } = require('./constants');

const javascriptEngines = {
    [javascriptEngineNames.SPIDER_MONKEY]: {
        openSource: true,
        activelyMantained: true,
        maintainedBy: maintainerNames.MOZILLA_FOUNDATION,
        firstReleaseDate: '1996-03-10',
        website: 'https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey',
    },
    [javascriptEngineNames.V8]: {
        openSource: true,
        activelyMantained: true,
        firstReleaseDate: '2008-11-02',
        maintainedBy: maintainerNames.THE_CHROMIUM_PROJECT,
        website: 'https://v8.dev/',
    },
    [javascriptEngineNames.CHAKRA_CORE]: {
        openSource: true,
        activelyMantained: true,
        firstReleaseDate: '2016-01-13'
        maintainedBy: maintainerNames.MICROSOFT,
        website: 'https://github.com/microsoft/chakracore',
    },
};

module.exports = javascriptEngines;
