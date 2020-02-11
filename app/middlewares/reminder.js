const nodemailer = require('nodemailer')
const cron = require('node-cron')

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'ramnath2609@gmail.com',
        pass : '9894262481'
    }
})



const reminderAlert = (req, res, next) => {
    //console.log('reminder alert', req.body)
    if(req.body.reminder) {
        console.log('reminder if')
        const message = {
            from : 'ramnath2609@gmail.com',
            to : req.user.email,
            subject : 'Cron notification',
            text : 'Complete the tasks given today'
        }
        console.log(req.body)
        const time = req.body.reminder.split(':')
        cron.schedule(`${time[1]} ${time[0]} * * *`, () => {
            transporter.sendMail(message, (error, info) => {
                if(error) {
                    console.log(error)
                } else {
                    console.log(info)
                }
            })
        })
        next()
    }else {
        next()
    }
   
}

module.exports = reminderAlert