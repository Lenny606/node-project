const express = require('express');
const morgan  = require('morgan');
const fs = require('fs');

const app = express();

//import files
const userRouter = require('./routes/userRoutes')
const tourRouter = require('./routes/tourRoutes')

//middleware for post req body
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
//read data once before !!!!
let tours = fs.readFileSync(`${__dirname}/data/tours-simple.json`)
tours = JSON.parse(tours);

// --- CALLBACKS -----------
//separate file


//----------ENDPOINTS --------------
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tours", tourRouter)
// app
//     .route('/api/v1/tours')
//     .get(getAllTours)
//     .post(createTour);
// // app.get('/api/v1/tours', getAllTours)
// // app.post('/api/v1/tours', createTour)
// app.get('/api/v1/tours/:id?', getTour)
//
// app.patch("/api/v1/tours/:id", (req, res) => {
// })
// app.delete("/api/v1/tours/:id", (req, res) => {
//
//     if (req.params.id > tours.length) {
//         res.status(404).json(
//             {
//                 "status": "not found",
//                 message: 'Invalid Id'
//             }
//         )
//     }
//
//     res.status(204).json(
//         {
//             "status": "success",
//             data: null
//         }
//     )
// })

//Creating group router with MW ExpresRouter
// const userRouter = express.Router()
// app.use("/api/v1/users", userRouter)
//
// userRouter.route('/')
//     .get(getAllUsers)
//     .post(createUser)
// userRouter.route('/:id')
//     .get(getUser)
//     .post(createUser)
//     .patch(updateUser)
//     .delete(deleteUser)



// //SERVER- moved to server.js----------------------
// const port = 3000;
// app.listen(port, () => {
//     console.log('App running on port ' + port)
// })

module.exports = app;