const puppeteer = require('puppeteer');

function getBrowserDataScraper({
    name,
    parse,
    url,
    waitForSelector,
}) {
    return {
        name,
        parse,
        url,
        waitForSelector,
    };
};

function getElementsWithText(
    text,
    element = '*',
) {
    const xpathResult = document.evaluate(`//${element}[contains(., '${text}')]`, document, null, XPathResult.ANY_TYPE, null );

    const results = [];
    while(result = xpathResult.iterateNext()){
        results.push(result);
    }

    return results;
}

const chromeDataScraper = getBrowserDataScraper({
    name: 'chrome',
    url: 'https://en.wikipedia.org/wiki/Google_Chrome_version_history',
    waitForSelector: 'table.wikitable.sortable.jquery-tablesorter',
    parse: async (page) => {
        const chromeData = await page.evaluate(() => {

            function cleanText(txt) {
                return txt
                    .replace('\n', '')
                    .trim();
            }

            const versionTds = document.querySelectorAll('table.wikitable.sortable.jquery-tablesorter tbody tr td:first-child');


            let engineRowspanBuffer = [];
            let v8EngineRowspanBuffer = [];

            // const data = [...versionTds].slice(0, 5).map(versionTd => {
            const data = [...versionTds].map(versionTd => {

                const parentElement = versionTd.parentElement;

                if (engineRowspanBuffer.length === 0) {
                    // try to populate
                    const engineElement = parentElement.children[2];
                    const rowspan = engineElement && parseInt(engineElement.getAttribute('rowspan'));

                    if (rowspan && rowspan > 0) {
                        engineRowspanBuffer = Array(rowspan).fill(cleanText(engineElement.innerText))
                    }
                }

                if (v8EngineRowspanBuffer.length === 0) {
                    // try to populate
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
                    name: 'chrome',
                    version: cleanText(versionTd.innerHTML),
                    releaseDate: cleanText(versionTd.nextElementSibling.innerHTML.match(/\d{4}-\d{2}-\d{2}/)[0]),
                    engineName: engine[0],
                    engineVersion: engine[1],
                    jsEngineName: 'V8',
                    jsEngineVersion,

                };
            })
            return data;
        });

        // const element = await page.$x("//button[contains(., 'Button text')]");
        // console.log(element);


        // const bodyHandle = await page.$('body');
        // const html = await page.evaluate(body => body.innerHTML, bodyHandle);
        // await bodyHandle.dispose();

        // const chromeData = await page.evaluate(() => {
            // const results = [];
            // const xpathResult = document.evaluate("//th[contains(text(), 'Major version')]", document);
            // let node;
            // while ((node = xpathResult.iterateNext()) != null) {
                // results.push(node);
            // }
            // console.log(results);
            // return results;

        // })

        // const chromeData = await page.evaluate(() => {
            // var titleNodeList = document.querySelectorAll(`a.storylink`);
            // var ageList = document.querySelectorAll(`span.age`);
            // var scoreList = document.querySelectorAll(`span.score`);
            // var titleLinkArray = [];
            // for (var i = 0; i < titleNodeList.length; i++) {
                // titleLinkArray[i] = {
                    // title: titleNodeList[i].innerText.trim(),
                    // link: titleNodeList[i].getAttribute("href"),
                    // age: ageList[i].innerText.trim(),
                    // score: scoreList[i].innerText.trim()
                // };
            // }
            // return titleLinkArray;
        // });
        return chromeData;
    },
});

async function getBrowserData(scraper) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(scraper.url);
    // await page.screenshot({path: 'example.png'});

    await page.waitForSelector(scraper.waitForSelector);

    const chromeData = await scraper.parse(page);

    await browser.close();

    return chromeData;
}

(async () => {
    const chromeData = await getBrowserData(chromeDataScraper);
    console.dir(chromeData);
})();
