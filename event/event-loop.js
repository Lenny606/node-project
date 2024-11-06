const fs = require('fs');
const crypto = require('crypto');

//set numebr of thread pools (4 is default)
process.env.UV_THREADPOOL_SIZE = 5;

fs.readFile("" , () => {
    //runs from top level code
    console.log("finished reading")
    console.log("-------------")

    //execute the callbacks in event loop
    setTimeout(() => {
        console.log("finished Timeout")
    })
    //run before Timout
    setImmediate( () => {
        console.log("finished immediate")
    })

    //executes after each loop phase / or before every next
    process.nextTick( () => {
        console.log("TICK TICK ---------")
    })

    crypto.pbkdf2('password', 'salt', 100000, 512, "sha512", () => {
        console.log("encrypted password")
    })
    crypto.pbkdf2('password', 'salt', 100000, 512, "sha512", () => {
        console.log("encrypted password")
    })
    crypto.pbkdf2('password', 'salt', 100000, 512, "sha512", () => {
        console.log("encrypted password")
    })
    crypto.pbkdf2('password', 'salt', 100000, 512, "sha512", () => {
        console.log("encrypted password")
    })
    crypto.pbkdf2('password', 'salt', 100000, 512, "sha512", () => {
        console.log("encrypted password")
    })



})