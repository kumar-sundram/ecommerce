const { User } = require('../models/user')

function autherization(req, res, next) {
    const user = req.user
    if (user.role == "admin") {
        next()
    } else {
        res.status('404').send('you are not autherized')
    }
}

module.exports = {
    autherization
}