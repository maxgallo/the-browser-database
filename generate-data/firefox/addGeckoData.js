const { compareByStringVersion } = require('../shared/utils');

function addGeckoData(firefoxData, geckoData) {
    let firefoxIndex = 0;
    let geckoIndex = 0;

    while (firefoxIndex < firefoxData.length) {
        while (
            geckoIndex < geckoData.length
            && compareByStringVersion( firefoxData[firefoxIndex].version, geckoData[geckoIndex].firefoxVersion ) > 0
        ) {
            geckoIndex++;
        }
        geckoIndex !== 0 && geckoIndex--;
        firefoxData[firefoxIndex].engineVersion = geckoData[geckoIndex].firefoxVersion;
        firefoxIndex++;
    }

    return firefoxData;
}

module.exports = addGeckoData;
