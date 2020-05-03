const { compareByStringVersion } = require('../shared/utils');

function addDataToFirefox({
    firefoxData,
    firefoxDataPropName,
    additionalData,
    additionalDataPropName
}) {
    let firefoxIndex = 0;
    let additionalDataIndex = 0;

    while (firefoxIndex < firefoxData.length) {
        while (
            additionalDataIndex < additionalData.length
            && compareByStringVersion( firefoxData[firefoxIndex].version, additionalData[additionalDataIndex].firefoxVersion ) > 0
        ) {
            additionalDataIndex++;
        }
        additionalDataIndex !== 0 && additionalDataIndex--;
        firefoxData[firefoxIndex][firefoxDataPropName] = additionalData[additionalDataIndex][additionalDataPropName];
        firefoxIndex++;
    }

    return firefoxData;
}

module.exports = addDataToFirefox;
