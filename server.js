const app = require('./app_refactored')

//SERVER-----------------------
const port = 3000;
app.listen(port, () => {
    console.log('App running on port ' + port)
})