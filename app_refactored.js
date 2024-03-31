const express = require('express');
const app = express();
const fs = require('fs');

//middleware for post req body
app.use(express.json());
//read data once before !!!!
let tours = fs.readFileSync(`${__dirname}/data/tours-simple.json`)
tours = JSON.parse(tours);

// --- callbacks -----------
const getAllTours = (req, res) => {
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
}
const port = 3000;
app.listen(port, () => {
    console.log('App running on port ' + port)
})