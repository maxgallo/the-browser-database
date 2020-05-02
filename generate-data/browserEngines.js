const { browserEngines } = require('./constants');

const browserEngines = {
    [browserEngines.WEBKIT]: {
        openSource: true,
        activelyMantained: true,
        firstReleaseDate: '2001-06-25',
        website: 'https://webkit.org/',
        forkedFrom: browserEngines.KHTML,
    },
    [browserEngines.BLINK]: {
        openSource: true,
        activelyMantained: true,
        firstReleaseDate: '2013-04-03',
        website: 'https://www.chromium.org/blink',
        forkedFrom: browserEngines.WEBKIT,
    },
    [browserEngines.TRIDENT]: {
        otherNames: 'MSHTML',
        openSource: false,
        activelyMantained: false,
        website: 'https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa741317(v=vs.85)?redirectedfrom=MSDN',
        firstReleaseDate: '1997-10-01',
        lastReleaseDate: '2015-07-15',
    },
    [browserEngines.EDGE_HTML]: {
        openSource: false,
        activelyMantained: false,
        firstReleaseDate: '2014-11-12',
        lastReleaseDate: '2018-10-02',
        forkedFrom: browserEngines.TRIDENT,
    },
    [browserEngines.GEKO]: {
        openSource: true,
        activelyMantained: true,
        firstReleaseDate: '1997-05-01',
    },
    [browserEngines.PRESTO]: {
        openSource: true,
        activelyMantained: false,
        firstReleaseDate: '2003-01-28',
        lastReleaseDate: '2013-07-02',
    },
    [browserEngines.GOANNA]: {
        openSource: true,
        activelyMantained: true,
        firstReleaseDate: '2016-01',
        forkedFrom: browserEngines.GEKO
    },
    [browserEngines.KHTML]: {
        activelyMantained: true,
        firstReleaseDate: '1998-11-04',
        lastReleaseDate: '2014-06-06',
    },
};
