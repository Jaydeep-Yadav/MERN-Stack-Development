const http = require('http');
const fs = require('fs');

// const port = process.env.PORT;
const port = 1100;
const host = 'localhost';

const home = fs.readFileSync('./index.html','utf-8');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        return res.end(home);
    }
    else {
        return res.end('404 NOT FOUND');
    }
});

server.listen(port,host, () => {
    console.log(`Server running`);
})