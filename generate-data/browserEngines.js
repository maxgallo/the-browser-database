const { engineNames } = require('./constants');

const browserEngines = {
    [engineNames.WEBKIT]: {
        openSource: true,
        activelyMantained: true,
        firstReleaseDate: '2001-06-25',
        website: 'https://webkit.org/',
        forkedFrom: engineNames.KHTML,
    },
    [engineNames.BLINK]: {
        openSource: true,
        activelyMantained: true,
        firstReleaseDate: '2013-04-03',
        website: 'https://www.chromium.org/blink',
        forkedFrom: engineNames.WEBKIT,
    },
    [engineNames.TRIDENT]: {
        otherNames: 'MSHTML',
        openSource: false,
        activelyMantained: false,
        website: 'https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa741317(v=vs.85)?redirectedfrom=MSDN',
        firstReleaseDate: '1997-10-01',
        lastReleaseDate: '2015-07-15',
    },
    [engineNames.EDGE_HTML]: {
        openSource: false,
        activelyMantained: false,
        firstReleaseDate: '2014-11-12',
        lastReleaseDate: '2018-10-02',
        forkedFrom: engineNames.TRIDENT,
    },
    [engineNames.GEKO]: {
        openSource: true,
        activelyMantained: true,
        firstReleaseDate: '1997-05-01',
    },
    [engineNames.PRESTO]: {
        openSource: true,
        activelyMantained: false,
        firstReleaseDate: '2003-01-28',
        lastReleaseDate: '2013-07-02',
    },
    [engineNames.GOANNA]: {
        openSource: true,
        activelyMantained: true,
        firstReleaseDate: '2016-01',
        forkedFrom: engineNames.GEKO
    },
    [engineNames.KHTML]: {
        activelyMantained: true,
        firstReleaseDate: '1998-11-04',
        lastReleaseDate: '2014-06-06',
    },
};

module.exports = browserEngines;
