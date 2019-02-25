const { User } = require('../models/user')

function authorization(req, res, next) {
    const user = req.user
    if (user.role == "admin") {
        next()
    } else {
        res.status('404').send('you are not autherized')
    }
}

module.exports = {
    authorization
}
