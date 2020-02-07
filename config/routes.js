const express = require('express')
const router = express.Router()
const notesController = require('../app/controllers/notesController')
const categoriesController = require('../app/controllers/categoriesController')
const usersController = require('../app/controllers/usersController')
const authenticateUser = require('../app/middlewares/authentication')
// const multer = require('multer')


// const storage = multer.diskStorage({
//     destination : (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename : (req, file, cb) => {
//         cb(null, new Date () + file.originalname)
//     }
// })

// const upload = multer({ storage })

router.get('/notes',authenticateUser, notesController.list)
router.get('/notes/:id',authenticateUser, notesController.show)
router.post('/notes', authenticateUser,  notesController.create)
router.put('/notes/:id', authenticateUser, notesController.update)
router.delete('/notes/:id', authenticateUser, notesController.destroy)

router.get('/categories', authenticateUser, categoriesController.list)
router.post('/categories',authenticateUser, categoriesController.create)
router.get('/categories/:id',authenticateUser, categoriesController.show)
router.put('/categories/:id',authenticateUser, categoriesController.update)
router.delete('/categories/:id',authenticateUser, categoriesController.destroy)

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)


module.exports = router