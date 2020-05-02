function scrapeChromeData({
    constants: { javascriptEngineNames, browserNames }
}) {
    function cleanText(txt) {
        return txt
            .replace('\n', '')
            .trim();
    }

    const versionTds = document.querySelectorAll('table.wikitable.sortable.jquery-tablesorter tbody tr td:first-child');


    let engineRowspanBuffer = [];
    let v8EngineRowspanBuffer = [];

    const data = [...versionTds].map(versionTd => {

        const parentElement = versionTd.parentElement;

        if (engineRowspanBuffer.length === 0) {
            const engineElement = parentElement.children[2];
            const rowspan = engineElement && parseInt(engineElement.getAttribute('rowspan'));

            if (rowspan && rowspan > 0) {
                engineRowspanBuffer = Array(rowspan).fill(cleanText(engineElement.innerText))
            }
        }

        if (v8EngineRowspanBuffer.length === 0) {
            const engineElement = parentElement.children[3];
            const rowspan = engineElement && parseInt(engineElement.getAttribute('rowspan'));

            if (rowspan && rowspan > 0) {
                v8EngineRowspanBuffer = Array(rowspan).fill(cleanText(engineElement.innerText))
            }
        }

        const engineNodeHtml = engineRowspanBuffer.length ? engineRowspanBuffer.pop() : cleanText(parentElement.children[2].innerText);
        const engine = engineNodeHtml.split(' ');

        const jsEngineVersion = v8EngineRowspanBuffer.length ? v8EngineRowspanBuffer.pop() : cleanText(parentElement.children[3].innerText);

        return {
            name: browserNames.CHROME,
            basedOn: browserNames.CHROMIUM,
            version: cleanText(versionTd.innerHTML),
            releaseDate: cleanText(versionTd.nextElementSibling.innerHTML.match(/\d{4}-\d{2}-\d{2}/)[0]),
            engineName: engine[0],
            engineVersion: engine[1],
            jsEngineName: javascriptEngineNames.V8,
            jsEngineVersion,

        };
    })

    return data;
};

module.exports = scrapeChromeData;
