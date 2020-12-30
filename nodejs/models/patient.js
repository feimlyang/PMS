const mongoose = require('mongoose')
const validator = require('validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const Patient = mongoose.model('Patient', {
    _id: {
        type: ObjectId,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    insuranceNum: {
        type: String,
        required: true
    },
    phone: {type: Number},
    address: {type: String},
    birthDate: {type: String},
    gender: {type: String},
    marital: {type: String},
    externalDocId: {type: Number},
    nokfirstName: {type: String},
    noklastName: {type: String},
    nokrelationship: {type: String},
    nokaddress: {type: String},
    nokphone: {type: Number},
    isAdmitted: {type: Boolean}
})
module.exports = Patient