const express = require('express')
const router = express.Router()
const notesController = require('../app/controllers/notesController')
const categoriesController = require('../app/controllers/categoriesController')
const multer = require('multer')


const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename : (req, file, cb) => {
        cb(null, new Date () + file.originalname)
    }
})

const upload = multer({ storage })

router.get('/notes', notesController.list)
router.get('/notes/:id', notesController.show)
router.post('/notes', upload.single('photo'), notesController.create)
router.put('/notes/:id', notesController.update)
router.delete('/notes/:id', notesController.destroy)

router.get('/categories', categoriesController.list)
router.post('/categories', categoriesController.create)
router.get('/categories/:id', categoriesController.show)
router.put('/categories/:id', categoriesController.update)
router.delete('/categories/:id', categoriesController.destroy)


module.exports = router