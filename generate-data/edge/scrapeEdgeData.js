function scrapeEdgeData({
    constants: { versionRegex, browserNames, javascriptEngineNames, engineNames },
}) {
    const { cleanText, parseWikipediaDate, getCompareByStringVersion } = window.utils;

    const table = document.querySelectorAll('table.wikitable')[1];

    let rowIndex = 1;

    const edgeData = [];

    while(rowIndex < table.rows.length) {
        const row = table.rows[rowIndex];
        if (!row || !row.cells || row.cells.length < 2) {
            rowIndex++;
            continue;
        }
        const releaseDateCell = row.cells[2];

        // skip future releases
        if (row.cells.length < 4 || cleanText(releaseDateCell.innerText) === 'TBA') {
            rowIndex++;
            continue;
        }

        const releaseDateCellText = cleanText(releaseDateCell.innerText);

        const versionCellText = row.cells[0].innerText;
        const engineCellText = row.cells[1].innerText;

        const version = versionCellText.match(new RegExp(versionRegex))[0];

        const engineName = cleanText(engineCellText.split(' ')[0]);
        const engineVersion = cleanText(engineCellText.split(' ')[1]);

        const releaseDate = parseWikipediaDate(releaseDateCellText);

        edgeData.push({
            name: browserNames.EDGE,
            version,
            engineName,
            engineVersion,
            jsEngineName: engineName === engineNames.EDGE_HTML ? javascriptEngineNames.CHAKRA_CORE : javascriptEngineNames.V8,
            jsEngineVersion: '',
            releaseDate,
        });

        rowIndex++;
    }

    edgeData.sort(getCompareByStringVersion('version'));

    return edgeData;
}


module.exports = scrapeEdgeData;
