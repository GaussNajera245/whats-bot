const createQR = require('./create-qrsvg');
const qrcode = require('qrcode-terminal');
const { MessageMedia, Client } = require('whatsapp-web.js');
const client = new Client();
let M = 0;
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log({qr})
});

client.on('ready', () => {
    console.log('Client is ready!');
});

const F =['xdxdx', 'hola', 'salu2', 'K'];
client.on('message', async message => {
    let X = message.body.split(' ');
    console.log(message.body);
    M++;

    if (X[0] === '!ping') {
        message.reply('pong');
        message.reply(F[M%4])
    } else {
        console.log({ X })
    }
});

client.initialize();