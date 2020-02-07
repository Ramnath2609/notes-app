const Note = require('../models/note')

module.exports.create = (req,  res) => {
    const body = req.body
    const note = new Note (body)
    note.user = req.user._id
    note.save()
        .then(note => {
            if (note) {
                res.send(note)
            } else {
                res.send({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Note.findByIdAndDelete(id)
        .then(note => {
            if (note) {
            res.json(note)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Note.findOne({ _id : id, user : req.user._id }).populate('category', ['_id', 'name'])
      .then(note => {
          res.json(note)
      })
      .catch(err => {
          res.json(err)
      })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Note.findByIdAndUpdate(id, body, { new : true, runValidators : true })
        .then(note => {
            if (note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
}


module.exports.list = (req, res) => {
    Note.find({ user : req.user._id }).populate('category', ['_id', 'name'])  // static method, since it is called on the model
        .then(notes => {
            res.json(notes)
        }) 
        .catch(err => {
            res.send(err)
        })
}


