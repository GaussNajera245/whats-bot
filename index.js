const fs = require('fs');
const session = require('./assets/session.json');
const createQR = require('./create-qrsvg');
const qrcode = require('qrcode-terminal');
const { MessageMedia, Client } = require('whatsapp-web.js');
const client = new Client({ session });
let msg;

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log({qr})
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    let X = message.body.split(' ');
    console.log(message.body)
    if (X[0] === '!ping') {
        createQR(X[1], async()=>{
            message.reply('pong');
            const msg = await MessageMedia.fromFilePath('./example.png');
            client.sendMessage(message.from, msg);
        })
    } else {
        console.log({ X })
    }
});

client.on('authenticated', (session) => {
    fs.writeFile('session.js', JSON.stringify(session), function (err) {
        console.log({ err })
    })
});

client.initialize();