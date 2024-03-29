const fs = require('fs');
const session = require('./assets/session.json');
const createQR = require('./create-qrsvg');
const qrcode = require('qrcode-terminal');
const { MessageMedia, Client } = require('whatsapp-web.js');
const { measureMemory } = require('vm');
const client = new Client({session}),
    ID  = ["5f74e86b994da3344484cf4d","5da0d5e6c5e42306ce3fc99d","5ebedf06a89f7d393ced6576","5f0e0af9911e98245f1164a6","5d30c612530a730e44c9f763","5e059a0aba8696067c373b45","5ee11a0803e67205f029c055","5f80c436ddb63f4070b40df2","5fa97963436d44471ce3cf6f","5fca9f568b6bfa36ec7978bd","5e34be90cba6e3157a1f4384","5ee10d7eb37a7243d85ab618","5ee1155ac7afed305c129048","5ee11d7852c7603a5c085437","5efce8612700c72c789f5187","5ed6a5f40b442d1cf8b9fba6","5e34beaccba6e3157a1f4385","5edec69c6cac0a3f3a491d4d","5d4857f3d7dc57033f3d2186","5d76cb44c6713a20049cfcd6","5cc8a6676386d70e0a73c312","5f776bb610774c4970bcc552","5f80c3e5ddb63f4070b40df1","5de97b83d74c5f173919268b","5e34bdefcba6e3157a1f4383","5e34bececba6e3157a1f4386","5f3d7f5e8c4b522e94c80675","600f00ffc3560ec3cf876f44","5da8a8b4b7e40d18d76249bf","5f5a5a342e2a6f0af01a4f16","5d263ab201920f05183e784f","5f453ea543c24536dabf7aa5","6036d67141621c739c863f9d","6036d69241621c739c863f9e","603e81d9cb5b2d3fb4be0b08","60625bf80fd3123388d8feab","609970f8b922f52c901aabbf","60a54433d31f6a35a851d80f","60b95e329a600945043a2f61","60dccec058030743d0968139","60f1e8d5cc303e0f1cc75232","61080a9140ea3c53f89d78e8"]
let msg;

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log({qr})
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    let X = message.body.split(' ').filter( x => x!=='');
    console.log({[message.from]:message.body});
    
    // if( message.from in conversation ){
    //     conversation[message.from] = [...conversation[message.from], message.from];

    //     client.sendMessage(message.from, 'Muy bien, Fecha de Nacimiento 📆? (Dia/Mes/Año) Ej: 11/12/1994:');
        
    // }else{
    //     conversation[message.from] = [];
    //     client.sendMessage(message.from, 'Saludos Buen Dia, Bienvenido al CardioBot ❤️, te tomaremos los datos para darte de alta en el sistema.\n\nComo primer campo, introduce tu nombre completo:');
    // }

    if (X[0] === '!ping') {
        createQR(X[1], async()=>{
            message.reply('pong');
            const msg = await MessageMedia.fromFilePath('./example.png');
            client.sendMessage(message.from, msg);
        })
    } 
});

// client.on('authenticated', (session) => {
//     fs.writeFile('session.js', JSON.stringify(session), function (err) {
//         console.log({ err })
//     })
// });

client.initialize();