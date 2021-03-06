function scrapeOperaData({
    constants: { engineNames, browserNames },
}) {
    const { cleanText } = window.utils;

    const allRows = document.querySelectorAll('table#historyTable tbody')[0].children;

    const data = [];

    let rowIndex = 0;

    while (rowIndex < allRows.length) {
        if (!allRows[rowIndex].children[0].innerText.match(/^Opera\s\d{2}/)) {
            rowIndex++;
            continue;
        }

        const version = cleanText(allRows[rowIndex].innerText.match(/Opera\s(\d*)/)[1]);
        const rawReleaseDate = cleanText(allRows[rowIndex+1].children[1].innerText);
        const engineVersion = cleanText(allRows[rowIndex+2].children[1].innerText.replace('Chromium', ''));
        const jsEngineName = cleanText(allRows[rowIndex+3].children[1].innerText);

        const releaseDate = rawReleaseDate.match(/\d{4}-\d{2}-\d{2}/)[0];

        data.push({
            name: browserNames.OPERA,
            basedOn: browserNames.CHROMIUM,
            version,
            releaseDate,
            engineName: engineNames.BLINK,
            engineVersion,
            jsEngineName,
            jsEngineVersion: '',
        });

        rowIndex++;
    }

    return data;
}

module.exports = scrapeOperaData;
