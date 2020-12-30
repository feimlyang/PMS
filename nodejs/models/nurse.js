const mongoose = require('mongoose')
const validator = require('validator')

const Nurse = mongoose.model('Nurse', {
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        }
    },
    password: {
        type: String,
        required: true
    }

})

module.exports = Nurse