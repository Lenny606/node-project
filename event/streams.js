const fs = require('fs');
const e = require("express");
const server = require('http').createServer()

server.on('request', (req, res) => {

    //classic readfile
    fs.readFile("text.txt", (err, data) => {
        if (err) {
            console.error(err)
        }
        res.end(data)
    })

    //stream, backpressure can be issue (response cannot handle requests)
    const readable = fs.createReadStream('text.txt')
    readable.on('data', chunk => {
        res.write(chunk)
    })
    readable.on('end', () => {
        res.end()
    })
    readable.on('error', error => {
       console.log(error)
        res.statusCode(500)
        res.end("Error: " + error)
    })

    //backpressure fixed automatically by pipe method (best practice)
    const readableStream = fs.createReadStream('text.txt')
    readableStream.pipe(res)

})

server.listen(8000)