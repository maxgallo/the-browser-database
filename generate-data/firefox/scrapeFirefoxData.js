function scrapeFirefoxData({
    constants: { browserNames, javascriptEngineNames, engineNames, versionRegex },
}){
    const  { cleanText, parseWikipediaDate, getCompareByStringVersion, parseTable} = window.utils;

    const allTables = document.querySelectorAll('table.wikitable');

    const releaseTables = [...allTables]
        .map(parseTable)
        .filter(table => (
            table[0]
            && table[0][0]
            && /Release history of Firefox/.test(table[0][0])
        ));

    function getDataFromOneTable(table) {
        const tableData = [];

        let rowIndex = 2;
        const rowsLength = table.length;

        while(rowIndex <= rowsLength) {
            if (!table[rowIndex]) {
                rowIndex++;
                continue
            }

            const [
                version,
                rawReleaseDate,
            ] = table[rowIndex].map(cleanText);

            if (/[a-zA-Z]/.test(version)) {
                rowIndex++;
                continue;
            }

            tableData.push({
                name: browserNames.FIREFOX,
                version,
                releaseDate: parseWikipediaDate(rawReleaseDate),
                engineName: engineNames.GEKO,
                engineVersion: '',
                jsEngineName: javascriptEngineNames.SPIDER_MONKEY,
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
