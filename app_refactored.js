const express = require('express');
const app = express();
const fs = require('fs');

const userRouter = require('./routes/userRoutes')

//middleware for post req body
app.use(express.json());
//mw for serving static files from folder - overview.html in public folder
app.use(express.static(`${__dirname}/public`))

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
const getAllTours = (req, res) => {
    res.status(200).json(
        {
            "status": "success",
            "requestedAt": req.requestTime,
            "results": tours.length,
            "data":
                {
                    tours
                }
        }
    )
}

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign(
        {
            id: newId,
            name: req.body.name,
            duration: req.body.duration
        }
    )

    tours.push(newTour);

    try {
        fs.writeFile(
            `${__dirname}/data/tours-simple.json`,
            JSON.stringify(tours),
            () => {
                res.status(201).json({
                    status: "success",
                    tour: newTour
                })
            })
    } catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
}
const getTour = (req, res) => {

    const tourId = req.params.id * 1

    if (tourId > tours.length) {
        res.status(404).json(
            {
                "status": "not found",
                message: 'Invalid Id'
            }
        )
    }

    const tour = tours.find(item => item.id === tourId)

    res.status(200).json(
        {
            "status": "success",
            "data":
                {
                    tour
                }
        }
    )

}


//----------ENDPOINTS --------------
app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);
// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours', createTour)
app.get('/api/v1/tours/:id?', getTour)

app.patch("/api/v1/tours/:id", (req, res) => {
})
app.delete("/api/v1/tours/:id", (req, res) => {

    if (req.params.id > tours.length) {
        res.status(404).json(
            {
                "status": "not found",
                message: 'Invalid Id'
            }
        )
    }

    res.status(204).json(
        {
            "status": "success",
            data: null
        }
    )
})

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
app.use("/api/v1/users", userRouter)

// //SERVER- moved to server.js----------------------
// const port = 3000;
// app.listen(port, () => {
//     console.log('App running on port ' + port)
// })

module.exports = app;