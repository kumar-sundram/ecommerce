const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { Schema } = mongoose
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return "invalid email id and password"
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 128
    },
    role: {
        type: String,
        required: true

    },
    tokens: [{
        token: {
            type: String
        }
    }]
})

userSchema.pre('validate', function (next) {
    let count
    if (this.isNew) {
        this.constructor.countDocuments((err, data) => {
            if (err) {
                return next(err)
            }
            count = data
        })
            .then(() => {
                if (count == 0) {
                    this.role = "admin"
                    next()
                } else {
                    this.role = "user"
                    next()
                }
            })
    } else {
        next()
    }
})


userSchema.pre('save', function (next) {
    if (this.isNew) {
        console.log(this)
        bcryptjs.genSalt(10).then((salt) => {
            bcryptjs.hash(this.password, salt).then((hashedpassword) => {
                this.password = hashedpassword
                next()
            })
        })
    } else {
        next()
    }
})
userSchema.statics.findByEmailAndPassword = function (email, password) {
    const User = this
    console.log(User)
    return User.findOne({ email })
        .then((user) => {
            if (user) {
                return bcryptjs.compare(password, user.password)
                    .then((result) => {
                        if (result) {
                            return new Promise((resolve, reject) => { resolve(user) })
                        }
                        else {
                            return new Promise((resolve, reject) => {
                                reject('invalid email id and password')
                            })
                        }
                    })

            } else {
                return new Promise((resolve, reject) => {
                    reject('invalid email id and password')
                })
            }
        })
        .catch((err) => {
            return new Promise((resolve, reject) => {
                reject('invalid email id and password')
            })
        })
}

userSchema.statics.findByToken = function (token) {
    const User = this
    let tokenData
    try {
        tokenData = jwt.verify(token, "kumar@123")
    } catch (err) {
        return Promise.reject(err)
    }
    return User.findOne({
        _id: tokenData.userId,
        'tokens.token': token
    })
        .then((user) => {
            console.log('insideFindByToken')
            return new Promise((resolve, reject) => {
                resolve(user)
            })
        })
        .catch((err) => {
            console.log('insideFindByCatch')

            return Promise.reject(err)
        })
}

userSchema.methods.generateToken = function () {
    const user = this
    console.log(this)
    const tokenData = {
        userId: user._id
    }
    console.log(tokenData)
    const token = jwt.sign(tokenData, "kumar@123")
    user.tokens.push({
        token
    })
    return user.save().then((user) => {
        console.log(user, "i am")
        return token
    })
        .catch((err) => {
            return err
        })
}

const User = mongoose.model('User', userSchema)
module.exports = {
    User
}