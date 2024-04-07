//TODO move fs here + data

//MW action
exports.checkID = (req, res, next, value) => {
    if(req.param.id * 1 > 100){
        return res.status(404).json({
            stattus: "error",
            message : "not found"
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