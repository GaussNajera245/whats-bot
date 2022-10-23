const puppeteer = require('puppeteer');
const qrgen = require('./create-qrsvg');
const fs = require('fs');



const html = fs.readFileSync("./assets/index.html", { encoding: 'utf8', flag: 'r' }),
    qr = fs.readFileSync("./assets/sample.svg", { encoding: 'utf8', flag: 'r' }),
    logo = fs.readFileSync("./assets/logoSVG.svg", { encoding: 'utf8', flag: 'r' }),
    newHTML = html.toString()
        .replace('{ rfid }', res.rfid)
        .replace('{ user }', res.name)
        .replace('{ logoSVG }', logo)
        .replace('{ qrcode }', qr);

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // await page.goto('http://localhost:3000/');
    await page.setContent(newHTML);
    await page.content();
    await page.screenshot({ path: 'example.png' });
    // await setTimeout(async () => {
    //     await browser.close();
    // }, 4500)
})();



        // const browser = await puppeteer.launch({ headless: false });
        // page.setContent(newHTML)
        // await page.content();

        // await setTimeout(async () => {
        //     await browser.close();
        // }, 4500)
    // puppeteer.launch()
    //     .then(async (browser) => {
    //         const page = await browser.newPage();
    //         page.setContent(newHTML)
    //             .then(async () => {
    //                 await page.content();
    //                 await page.screenshot({ path: 'example.png' });
    //                 await setTimeout(async () => {
    //                     await browser.close();
    //                 }, 10000)
    //             })
    //             .catch(e => console.log({ e }))
    //     })
    //     .catch(e => console.log({ e }))



