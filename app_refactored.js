const express = require('express');
const morgan  = require('morgan');
const fs = require('fs');

const app = express();

//import files
const userRouter = require('./routes/userRoutes')
const tourRouter = require('./routes/tourRoutes')

//MIDDLEWARES for post req body
app.use(express.json());
//mw for serving static files from folder - overview.html in public folder
app.use(express.static(`${__dirname}/public`))
//MORGAN MW - adds/returns log with information about request + condition for dev
if(process.env.NODE_ENV === "dev") {
    app.use(morgan('dev'))
}
//custom MW with express, applies for every request, must be before all requests
app.use((req, res, next) => {
    console.log("HELLO FROM CUSTOM MW");
    next();
})
app.use((req, res, next) => {
    //adds this property
    req.requestTime = new Date().toISOString()
    next()
})

// --- CALLBACKS -----------
//in separate files

//----------ENDPOINTS --------------
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tours", tourRouter)

// //SERVER- moved to server.js----------------------

module.exports = app;