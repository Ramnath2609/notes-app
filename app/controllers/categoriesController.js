const Category = require('../models/category')
const Note = require('../models/note')

module.exports.list = (req, res) => {
    console.log(req.user)
    Category.find({ user : req.user._id})
    .then(category => {
        res.json(category)
    })
    .catch(err => {
        res.json(err)
    })
}

module.exports.create = (req,res) => {
    const body = req.body
    const category = new Category(body)
    category.user = req.user._id
    category.save()
        .then(category => {
            res.json(category)
        })
        .catch(err =>{
            res.send(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Category.findOne({ _id : id, user : req.user._id})
        .then(category => {
            if (category) {
                res.json(category)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Category.findOneAndUpdate({ _id : id, user : req.user._id }, body, {new: true, runValidators : true})
        .then(category => {
            if (category) {
                res.json(category)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    const deptNone = "5e3d0e5811237607d409d87c"
    Note.updateMany({ category : id }, { category : deptNone })
        .then(notes => {
            res.send(notes)
        })
        .catch(err => {
            res.semd(err)
        })
    Category.findOneAndDelete({ _id : id, user : req.user._id })
        .then(category => {
            res.json(category)
        })
        .catch(err =>{
            res.json(err)
        })
}
