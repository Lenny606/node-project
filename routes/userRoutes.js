const express = require('express')
const router = express.Router()
const userController = require('./../controllers/userController')

// PARAM MW ------------
//works only for this module userRoutes
// router.param('id', (req, res, next, value) => {
//     console.log(`Param Id value is ${value}`)
//     next()
// })
//moved to controller and refactored here
router.param('id', userController.checkID)


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