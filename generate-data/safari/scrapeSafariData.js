function scrapeFirefoxData({
    constants: { browserNames, javascriptEngineNames, engineNames },
}){
    const  { cleanText, parseWikipediaDate, getCompareByStringVersion } = window.utils;

    const allTables = document.querySelectorAll('table.wikitable');

    const releaseTables = [...allTables]
        .filter(table => (
            table.rows[0]
            && table.rows[0].cells[0]
            && /Table of versions/.test(table.rows[0].cells[0].innerText)
        ))
        .slice(0, 12);

    function getDataFromOneTable(table) {
        const tableData = [];

        let rowIndex = 2;

        let skipNextRowsCount = 0;

        while(rowIndex <= table.rows.length) {
            const row = table.rows[rowIndex];
            if (!row) {
                rowIndex++;
                continue
            }

            if (skipNextRowsCount > 0) {
                rowIndex++;
                skipNextRowsCount--;
                continue;
            }

            const rowspan = row.cells[0] && parseInt(row.cells[0].getAttribute('rowspan'));
            if (rowspan && rowspan > 0) {
                skipNextRowsCount = rowspan - 1;
            }

            const [
                firstColumText,
                secondColumnText,
                thirdColumnText,
                fourthColumnText,
            ] = [...row.cells].map(x => x.innerText).map(cleanText)

            const version = firstColumText;

            const engineVersion = secondColumnText;

            const maybeDateInThirdColumn = parseWikipediaDate(thirdColumnText);
            const maybeDateInFourthColumn = parseWikipediaDate(fourthColumnText);

            const releaseDate = /\d{4}-\d{2}-\d{2}/.test(maybeDateInThirdColumn)
                ? maybeDateInThirdColumn
                : maybeDateInFourthColumn;

            tableData.push({
                name: browserNames.SAFARI,
                version,
                releaseDate,
                engineName: engineNames.WEBKIT,
                engineVersion,
                jsEngineName: javascriptEngineNames.NITRO,
                jsEngineVersion: '',
            });
            rowIndex++;
        }

        return tableData;
    }

    const data = releaseTables.reduce((output, table) => {
        output.push(...getDataFromOneTable(table));
        return output;
    }, []);

    data.sort(getCompareByStringVersion('version'));

    return data;
}

module.exports = scrapeFirefoxData;
