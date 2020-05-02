const { writeFileSync } = require('fs');

function writeJsonFile(obj, filePath) {
    const json = JSON.stringify(obj, null, 4);
    writeFileSync(filePath, json, 'utf8');
}

module.exports = writeJsonFile;
