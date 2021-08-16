const fs = require('fs');
const http = require("http");

const fsReadFileHtml = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, fileName), 'utf8', (error, htmlString) => {
            if (!error && htmlString) {
                resolve(htmlString);
            } else {
                reject(error)
            }
        });
    });
}

http.createServer((req, res) => {
    fsReadFileHtml('bai55.html')
        .then(html => {
            res.writeHead(200, {
                "Content-type": "text/html"
            });
            res.end(html.replace("{ user }", "Node JS"));
        })
        .catch(error => {
            res.setHeader('Content-Type', 'text/plain');
            res.end(`Error ${error}`);
        })
}).listen(1337, "127.0.0.1");