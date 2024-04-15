//TODO move fs here + data
const fs = require('fs');
//read data once before !!!!
let tours = fs.readFileSync(`${__dirname}/../data/tours-simple.json`)
tours = JSON.parse(tours);

//MW action
exports.checkID = (req, res, next, value) => {
    if (req.param.id * 1 > 100) {
        return res.status(404).json({
            status: "error", message: "not found"
        })
    }
    next()
}

exports.checkBody = (req, res, next, value) => {
    if (!req.body.name) {
        return res.status(400).json({
            status: "error", message: "body => name is empty"
        })
    }
    next()
}


//-----------------Handlers-------------------
exports.getAllTours = (req, res) => {
    res.status(200).json({
        "status": "success", "requestedAt": req.requestTime, "results": tours.length, "data": {
            tours
        }
    })
}
exports.getTour = (req, res) => {

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
exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({
        id: newId, name: req.body.name, duration: req.body.duration
    })
    tours.push(newTour);

    try {
        fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), () => {
            res.status(201).json({
                status: "success", tour: newTour
            })
        })
    } catch (e) {
        res.status(500).json({
            status: "failed", message: e.message
        })
    }
}
exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'ok', message: "Tour update"
    })
}
exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'ok', message: "deleted"
    })
}