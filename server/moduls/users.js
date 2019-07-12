const mongoose = require('mongoose');
const validator = require('validator');       //npm install validator@5.6.0 --save
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        default: 'cavidmelikli@gmail.com',
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{Value} is not a valid email'
        }
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },

    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {       // bu funksiya vasitesiyle biz dedikki bize ancaq id ve emaili goster
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};


UserSchema.methods.generateAuthToken = function () {      //token yaradan funksiya yaratdiq ve bunu server.js-de cagiracayiq. Arrow kimi yazsaq bind elemir
    const user = this;
    const access = 'auth';
    const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

    user.tokens = user.tokens.concat([{ access, token }]);       //burda tokene bir nov push etdik yeni datalari

    return user.save().then(() => {
        return token;
    });
};

UserSchema.statics.findByToken = function (token) {    //tokene gore tapmaq
    const User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // })
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}


const User = mongoose.model('User', UserSchema)

module.exports = { User };