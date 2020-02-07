const User = require('../models/user')


module.exports.register = (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.login = (req, res) => {
    const body = req.body
    User.findByCredentials(body)
        .then(user => {
            return user.generateToken()
        })
        .then(token => {
            res.send({ token })
        })
        .catch(err => {
            res.send({err})
        })
}