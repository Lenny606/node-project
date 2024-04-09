//TODO move fs here + data

//MW action
exports.checkID = (req, res, next, value) => {
    if(req.param.id * 1 > 100){
        return res.status(404).json({
            status: "error",
            message : "not found"
        })
    }
    next()
}

exports.checkBody = (req, res, next, value) => {
    if(!req.body.name){
        return res.status(400).json({
            status: "error",
            message : "body => name is empty"
        })
    }
    next()
}


//-----------------Handlers-------------------
exports.getAllUsers = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message : "Route not defined"
    })
}
exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message : "Route not defined"
    })
}
exports.createUser = (req, res) =>{
    res.status(201).json({
        status: 'ok',
        message : "User created"
    })
}
exports.updateUser = (req, res) =>{
    res.status(200).json({
        status: 'ok',
        message : "User update"
    })
}
exports.deleteUser = (req, res) =>{
    res.status(204).json({
        status: 'ok',
        message : "deleted"
    })
}