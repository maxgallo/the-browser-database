// haven't found a way to avoid duplication
function compareByStringVersion(xVersion, yVersion, factor = 1) {
    const [ majorX, minorX, patchX ] = xVersion.split('.').map(parseFloat);
    const [ majorY, minorY, patchY ] = yVersion.split('.').map(parseFloat);

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

    function compareByStringVersion(xVersion, yVersion, factor = 1) {
        const [ majorX, minorX, patchX ] = xVersion.split('.').map(parseFloat);
        const [ majorY, minorY, patchY ] = yVersion.split('.').map(parseFloat);

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

    window.utils = {
        cleanText,
        getMonthAsNumber,
        getCompareByStringVersion,
    };
}

module.exports = {
    addUtilsToWindow,
    compareByStringVersion,
};
