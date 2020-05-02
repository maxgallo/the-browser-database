function scrapeGeckoData({
    constants: { versionRegex },
}) {
    const { getCompareByStringVersion } = window.utils;

    const table = document.querySelectorAll('table.standard-table')[0];

    let rowIndex = 1;

    const geckoAndFirefoxVersions = [];

    while(rowIndex < table.rows.length) {
        const row = table.rows[rowIndex];
        if (!row || !row.cells || row.cells.length < 2) {
            rowIndex++;
            continue;
        }
        const geckoVersionCellText = row.cells[0].innerText;
        const firefoxVersionCellText = row.cells[1].innerText;

        const firefoxVersion = firefoxVersionCellText.match(new RegExp(`Firefox\\s(${versionRegex})`))[1];
        const geckoVersion = geckoVersionCellText.match(new RegExp(`Gecko\\s(${versionRegex})`))[1];

        geckoAndFirefoxVersions.push({
            firefoxVersion,
            geckoVersion,
        })
        rowIndex++;
    }

    geckoAndFirefoxVersions.sort(getCompareByStringVersion('firefoxVersion'));

    return geckoAndFirefoxVersions;
};

module.exports = scrapeGeckoData;
