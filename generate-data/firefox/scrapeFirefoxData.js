function scrapeFirefoxData({
    constants: { browserNames, javascriptEngineNames, engineNames }
}){
    function cleanText(txt) {
        return txt
            .replace('\n', '')
            .trim();
    }

    function convertDate(date) {
        const [monthAsString, day, year] = date
            .replace(',','')
            .split(' ');

        const month = {
            January: '01',
            February: '02',
            March: '03',
            April: '04',
            May: '05',
            June: '06',
            July: '07',
            August: '08',
            September: '09',
            October: '10',
            November: '11',
            December: '12',
        }[monthAsString];

        return `${year}-${month}-${('0'+day).slice(-2)}`;
    }

    const allTables = document.querySelectorAll('table.wikitable');

    const releaseTables = [...allTables].filter(table => (
        table.rows[0]
        && table.rows[0].cells[0]
        && /Release history of Firefox/.test(table.rows[0].cells[0].innerText)
    ));

    function getDataFromOneTable(table) {
        const tableData = [];

        let rowIndex = 2;

        while(rowIndex <= table.rows.length) {
            if (!table.rows[rowIndex]) {
                rowIndex++;
                continue
            }
            const parsedVersion = table.rows[rowIndex].cells[0].innerText;
            const version = cleanText(parsedVersion);
            if (/\d{1,4}(\.\d{1,4}(\.\d{1,4})?)?$/.test(version)) {
                tableData.push({
                    name: browserNames.FIREFOX,
                    version,
                    releaseDate: convertDate(cleanText(table.rows[rowIndex].cells[1].innerText)),
                    engineName: engineNames.GEKO,
                    engineVersion: 'read from https://developer.mozilla.org/en-US/docs/Mozilla/Gecko/Versions',
                    jsEngineName: javascriptEngineNames.SPIDER_MONKEY,
                    jsEngineVersion: 'read from https://en.wikipedia.org/wiki/SpiderMonkey',
                });
            }
            rowIndex++;
        }

        return tableData;
    }

    const data = releaseTables.reduce((output, table) => {
        output.push(...getDataFromOneTable(table));
        return output;
    }, []);

    return data;
}

module.exports = scrapeFirefoxData;
