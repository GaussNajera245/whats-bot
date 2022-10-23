const puppeteer = require('puppeteer');

( async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 960,
        height: 760,
        deviceScaleFactor: 1,
    });            
    await page.setContent(imgHTML);
    await page.screenshot({path: example.png});
    await browser.close();

})()
// (async () => {
//     const browser = await puppeteer.launch({ headless: false });
//     // await page.goto('http://localhost:3000/');
//     await page.setContent(HTML)
//         await page.screenshot({ path: 'example.png' });
//         await setTimeout(async () => {
//             await browser.close();
//         }, 4500)
// })();