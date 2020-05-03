// haven't found a way to avoid duplication
function compareByStringVersion(xVersion, yVersion, factor = 1) {
    const [ majorX, minorX, patchX ] = xVersion.split('.').map(parseFloat).map(x => isNaN(x) ? 0 : x);
    const [ majorY, minorY, patchY ] = yVersion.split('.').map(parseFloat).map(x => isNaN(x) ? 0 : x);

    if (majorX !== majorY) {
        return (majorX - majorY) * factor;
    }

    if (minorX !== minorY) {
        return (minorX - minorY) * factor;
    }

    return (patchX - patchY) * factor;
}

function addUtilsToWindow() {
    function cleanText(txt) {
        return txt
            .replace('\n', '')
            .trim();
    }

    function getMonthAsNumber(monthAsString) {
        return {
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
    }

    function parseWikipediaDate(date) {
        if (!date) {
            return '';
        }
        const [monthAsString, day, year] = date
            .replace(',','')
            .split(' ');

        return `${year}-${getMonthAsNumber(monthAsString)}-${('0'+day).slice(-2)}`;
    }

    function compareByStringVersion(xVersion, yVersion, factor = 1) {
        const [ majorX, minorX, patchX ] = xVersion.split('.').map(parseFloat).map(x => isNaN(x) ? 0 : x);
        const [ majorY, minorY, patchY ] = yVersion.split('.').map(parseFloat).map(x => isNaN(x) ? 0 : x);

        if (majorX !== majorY) {
            return (majorX - majorY) * factor;
        }

        if (minorX !== minorY) {
            return (minorX - minorY) * factor;
        }

        return (patchX - patchY) * factor;
    }

    function getCompareByStringVersion(fieldName, ascending = true) {
        const sortingFactor = ascending ? 1 : -1;
        return (x, y) => compareByStringVersion(x[fieldName], y[fieldName], sortingFactor);
    }

    function parseTable(table) {
        let rowIndex = 0;
        const tableArray = [];

        const colRowspanBuffers = [];

        while (rowIndex < table.rows.length) {
            const row = table.rows[rowIndex];
            tableArray[rowIndex] = [];

            let cellIndex = 0;
            let skippedColumnCount = 0

            while (cellIndex < row.cells.length) {
                const outputIndex = cellIndex + skippedColumnCount;

                if (colRowspanBuffers[outputIndex] && colRowspanBuffers[outputIndex].length > 0) {
                    tableArray[rowIndex].push(colRowspanBuffers[outputIndex].pop());
                    skippedColumnCount++;
                    continue;
                }

                const cell = row.cells[cellIndex];

                const rowspan = parseInt(cell.getAttribute('rowspan'));
                if (rowspan && rowspan > 0) {
                    colRowspanBuffers[outputIndex] = Array(rowspan - 1).fill(cell.innerText);
                }

                tableArray[rowIndex].push(row.cells[cellIndex].innerText);
                cellIndex++;
            }
            rowIndex++;
        }
        return tableArray;
    }

    window.utils = {
        cleanText,
        parseWikipediaDate,
        getMonthAsNumber,
        getCompareByStringVersion,
        parseTable,
    };
}

module.exports = {
    addUtilsToWindow,
    compareByStringVersion,
};
