const fs = require('fs'); //filesystem
const http = require('http'); //http module for server
const url = require('url'); //path/routing module

const test = fs.readFileSync('./some.txt', 'utf-8')
fs.writeFileSync('./text.txt', "something")
console.log(test);
//async
fs.readFile('./text.txt', "utf-8", (err, data) => {
})

/////////////----------------SERVER---------------------///////////////////////////////
function replaceTemplate(template, card){
   // let output = template.replace(/{% CARDS %}/g, card.name)
    let output = template.replace(/{%NAME%}/g, card.name)
    output = output.replace(/{%TYPE%}/g, card.type)
    output = output.replace(/{%description%}/g, card.description)
    output = output.replace(/{%population%}/g, card.population)

    return output;
}


//sync method outside callbacks- load only once, more effective
let data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8')
let dataObj = JSON.parse(data);
//loads templates
let templateOverview = fs.readFileSync(`${__dirname}/template/overview.html`, 'utf-8')
let templateCard = fs.readFileSync(`${__dirname}/template/card.html`, 'utf-8')
let templatePlanets = fs.readFileSync(`${__dirname}/template/planets.html`, 'utf-8')


//create server
const server = http.createServer((req, res) => {
    //  console.log(req.url) returns => /path?params=value
    const pathName = req.url

    if (pathName === '/overview' || pathName === '/') {

        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        const cardsHtml = dataObj.map( item => replaceTemplate(templateCard, item)).join('')
        let output = cardsHtml.replace(/{% CARDS %}/g, cardsHtml)
        res.end(output)

    } else if (pathName === '/product') {
        res.end("Hello from product")

    } else if (pathName === '/api') {

        //async method
        // fs.readFile(`${__dirname}/data/data.json`, 'utf-8', (err, data) => {
        //     const test = (data)
        //     res.writeHead(200, {
        //             'Content-type': 'application/json'
        //         }
        //     )
        //     res.end(test)
        // })

        res.writeHead(200, {
                'Content-type': 'application/json'
            }
        )
        res.end(data)

    } else {
        res.writeHead(404, {
            'Content-type': "text/html",
            'my-own-header': "hello"
        })
        res.end("<h1>Page not found - 404</h1>") //return simplest response
    }


})

//listen to req
server.listen(8000, '127.0.0.1', () => {
    console.log("listening on port 8000")
})
