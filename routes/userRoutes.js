const express = require('express')
const router = express.Router()
const userController = require('./../controllers/userController')

//-----------------ROUTES-------------------
router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
router.route('/:id')
    .get(userController.getUser)
    .post(userController.createUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

//export router
module.exports = router;