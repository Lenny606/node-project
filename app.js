const express = require('express');
const app = express();
const fs = require('fs');

//middleware for post req body
app.use(express.json());

// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: "hello from server side"
//     })
// })
//
// app.post('/', (req, res) => {
//     res.status(200).json({
//         message: "hello from post response"
//     })
// })

//read data once before !!!!
let tours = fs.readFileSync(`${__dirname}/data/tours-simple.json`)
tours = JSON.parse(tours);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json(
        {
            "status": "success",
            "results": tours.length,
            "data":
                {
                    tours
                }
        }
    )
})

app.post('/api/v1/tours', (req, res) => {
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

})

// -------- ID ---------------
app.get('/api/v1/tours/:id?', (req, res) => {

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
})


const port = 3000;
app.listen(port, () => {
    console.log('App running on port ' + port)
})