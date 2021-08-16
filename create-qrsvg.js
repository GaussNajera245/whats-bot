const QRCode = require("qrcode-svg");
const puppeteer = require('puppeteer');
const fs = require('fs');
const names = ["Sebastián Tafalla", "Saúl Gayoso", "Fernando Xirau", "Isaac Andrade", "Jacobo Aparicio", "Leonardo Barrueco", "Raúl Aguayo", "Marco Arnal", "César Guillén", "Javier Saelices"];

function asyncQR(rfid, callback) {
    const qrcode = new QRCode({
      ecl: "M", background: "#ffffff",
      padding: 1, width: 256,
      height: 256, color: "#000000",
      content: rfid,
    });
    qrcode.save("./assets/sample.svg", function (error) {
      if (error) throw new Error('QR generator:', error)

      const html = fs.readFileSync("./assets/index.html", { encoding: 'utf8', flag: 'r' }),
        qr = fs.readFileSync("./assets/sample.svg", { encoding: 'utf8', flag: 'r' }),
        logo = fs.readFileSync("./assets/logoSVG.svg", { encoding: 'utf8', flag: 'r' }),
        newHTML = html.toString()
          .replace('{ rfid }', rfid)
          .replace('{ user }', names[Math.floor(Math.random() * 9)])
          .replace('{ logoSVG }', logo)
          .replace('{ qrcode }', qr);

      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(newHTML);
        await page.content();
        await page.screenshot({ path: 'example.png' });
        callback()
      })()

    });
}

module.exports = asyncQR;