function scrapeSafariData({
    constants: { browserNames, javascriptEngineNames, engineNames },
}){
    const  { cleanText, parseWikipediaDate, getCompareByStringVersion, parseTable } = window.utils;

    const allTables = document.querySelectorAll('table.wikitable');

    const releaseTables = [...allTables]
        .map(parseTable)
        .filter(table => (
            table[0]
            && table[0][0]
            && /Table of versions/.test(table[0][0])
        ))
        .slice(0, 12);

    function getDataFromOneTable(table) {
        const tableData = [];

        let rowIndex = 2;
        const rowsLength = table.length;

        while(rowIndex <= rowsLength) {
            const row = table[rowIndex];
            if (!row) {
                rowIndex++;
                continue
            }

            const [
                version,
                rawEngineVersion,
                _,
                rawReleaseDate,
            ] = table[rowIndex].map(cleanText);

            if (/Beta/.test(version)) {
                rowIndex++;
                continue
            }

            const releaseDate = parseWikipediaDate(rawReleaseDate);
            const engineVersion = rawEngineVersion.replace(/\[.*\]/,'');

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

    // Fill the gaps in WebKit versions (eg. Safari 8)
    let lastEngineVersion;
    data.forEach(safariEntryData => {
        if (!safariEntryData.engineVersion) {
            safariEntryData.engineVersion = lastEngineVersion;
        }
        lastEngineVersion = safariEntryData.engineVersion;
    });

    return data;
}

module.exports = scrapeSafariData;
