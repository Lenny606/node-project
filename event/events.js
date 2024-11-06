//Event module
const EventEmitter = require('events')
const myEmitter = new EventEmitter();


//Observer pattern
//listener
myEmitter.on('newSale', (amount) => {
    console.log('new sale done - amount: ' + amount)
})
//trigger
myEmitter.emit('newSale', 1000);

//use as class inheritence, good practice
class Sales extends EventEmitter {
    constructor() {
        super();

    }
}
const myClassEmitter = new Sales()
myClassEmitter.on('message', (event) => {
    console.log(event)
})
myClassEmitter.emit('message', "New Message sending")