let http = require('http');
let fs = require('fs');

var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(__dirname + '/'));
function error404() {
    response.writeHead(404);
    respone.write('Not found.');
}
var directory = ["index.html", "style.css", "script.js", "perfect_dos_vga_437-webfont.woff", "help.txt"];
let handleRequest = (request, response) => {
    let req;
    if (request.url == "/") {
        req = "\index.html";
    } else {
        req = request.url;
        req = req.replace("/", "");
    }
    if (req.endsWith(".css")) {
        response.writeHead(200, {
            'Content-Type': 'text/css'
        });
    } else {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
    }
    if (directory.indexOf(req) == -1) {
        req = "\error.html"
    }
    console.log(req);
    fs.readFile(req, null, function (error, data) {
        if (error) {
            error404();
        } else {
            response.write(data);
        }
        response.end();
    });
};
http.createServer(handleRequest).listen(1337);