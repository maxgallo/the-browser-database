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

    window.utils = {
        cleanText,
        getMonthAsNumber,
    };
}

module.exports = {
    addUtilsToWindow,
};
