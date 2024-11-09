const fs = require('fs');
const superagent = require('superagent');
const {response} = require("express");

const file = `${__dirname}/promises.txt`;
const breed = `${__dirname}/breed.txt`;
const filePromise = `${__dirname}/file-promises.txt`;

//Builds Promise
const readFilePromise = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err + " - Could not find file.");
            } else {
                console.log(data);
                resolve(data);
            }
        });
    });
}
const writeFilePromise = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("success");
            }
        });
    });
}

readFilePromise(breed).then(data => {
    return superagent.get('https://dog.ceo/api/breed/' + data + '/images/random')  //chaining promises
}).then(res => {
    return writeFilePromise(file, res.body.message)
}).then(() => {
    console.log('Data saved successfully!');
}).catch(error => {
    console.error(error );
})


//Only Consumes Promise
fs.readFile(file, (err, data) => {
    console.error(data);
    superagent.get('https://dog.ceo/api/breeds/list/all').then(response => {
        fs.writeFile(file, response.body.message.toString(), (error, data) => {
            if (error) {
                return console.error(error);
            } else {
                console.log('Data saved successfully!');
            }
        })
    }).catch(error => {
        console.error(error);
    })
})