const dotenv = require('dotenv')
dotenv.config(
    {path: './env'}
)
const app = require('./app_refactored')


//ENV
//return environment from express
// app.get("env");
//get from file, process.env globally accessible

//node env variables without declaring module
console.log(process.env)
//SERVER-----------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App running on port ' + port)
})