const operaDataScraper = {
    name: 'opera',
    url: 'https://help.opera.com/en/opera-version-history/',
    waitForSelector: '#historyTable',
    parse: () => {
        function cleanText(txt) {
            return txt
                .replace('\n', '')
                .trim();
        }

        const allRows = document.querySelectorAll('table#historyTable tbody')[0].children;

        const data = [];

        let rowIndex = 0;

        while (rowIndex < allRows.length) {
            if (!allRows[rowIndex].children[0].innerText.match(/^Opera\s\d{2}/)) {
                rowIndex++;
                continue;
            }

            const version = cleanText(allRows[rowIndex].innerText.replace('Opera', ''));
            const releaseDate = cleanText(allRows[rowIndex+1].children[1].innerText);
            const engineVersion = cleanText(allRows[rowIndex+2].children[1].innerText.replace('Chromium', ''));
            const jsEngineName = cleanText(allRows[rowIndex+3].children[1].innerText);

            data.push({
                name: 'opera',
                basedOn: 'chromium',
                version,
                releaseDate,
                engineName: 'Blink',
                engineVersion,
                jsEngineName,
                jsEngineVersion: '',
            });

            rowIndex++;
        }

        return data;
    },
};

module.exports = operaDataScraper;
