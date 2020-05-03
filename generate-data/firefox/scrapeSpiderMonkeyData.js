function scrapeSpiderMonkeyData({
    constants: { versionRegex },
}) {
    const { getCompareByStringVersion } = window.utils;

    const table = document.querySelectorAll('table.wikitable')[0];

    let rowIndex = 1;

    const spiderMonkeyData = [];

    while(rowIndex < table.rows.length) {
        const row = table.rows[rowIndex];
        if (!row || !row.cells || row.cells.length < 2) {
            rowIndex++;
            continue;
        }
        const spiderMonkeyVersion = row.cells[0].innerText;
        const firefoxVersionCellText = row.cells[3].innerText;
        const releaseDate = row.cells[1].innerText;

        const firefoxVersionMatch = firefoxVersionCellText.match(new RegExp(`Firefox\\s(${versionRegex})`));

        const firefoxVersion = firefoxVersionMatch ? firefoxVersionMatch[1] : '';


        spiderMonkeyData.push({
            firefoxVersion,
            spiderMonkeyVersion,
            releaseDate,
        });

        rowIndex++;
    }

    spiderMonkeyData.sort(getCompareByStringVersion('firefoxVersion'));

    return spiderMonkeyData;
}


module.exports = scrapeSpiderMonkeyData;
