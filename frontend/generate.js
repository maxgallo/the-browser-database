const bcd = require('@mdn/browser-compat-data');
const fs = require('fs');

// console.log(bcd.browsers.chrome)

const output = []

Object.values(bcd.browsers).forEach(browserData => {
    const releases = [];
    Object.entries(browserData.releases).forEach(([version, releaseData]) => {
        releases.push({
            ...releaseData,
            version,
            name: browserData.name
        })
    })
    output.push(...releases);
})

console.log(output.length); // 778 objects
fs.writeFileSync('./pages/browsers.json', JSON.stringify(output));
