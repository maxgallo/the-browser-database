function scrapeChromeData({
    constants: { javascriptEngineNames, browserNames, versionRegex },
}) {

    const { cleanText, parseTable } = window.utils;
    const rawTable = document.querySelectorAll('table.wikitable')[1];

    const table = parseTable(rawTable);
    const rowsLength = table.length;

    let rowIndex = 1;
    const data = [];

    while(rowIndex < rowsLength) {
        const [
            version,
            rawReleaseDate,
            rawEngine,
            jsEngineVersion,
        ] = table[rowIndex].map(cleanText);

        if (!new RegExp(`^${versionRegex}$`).test(version)) {
            rowIndex++;
            continue;
        }

        const releaseDate = rawReleaseDate.match(/\d{4}-\d{2}-\d{2}/)[0];
        const [engineName, engineVersion] = rawEngine.split(' ');

        data.push({
            name: browserNames.CHROME,
            basedOn: browserNames.CHROMIUM,
            version,
            releaseDate,
            engineName,
            engineVersion,
            jsEngineName: javascriptEngineNames.V8,
            jsEngineVersion,
        });

        rowIndex++;
    }

    return data;
};

module.exports = scrapeChromeData;
