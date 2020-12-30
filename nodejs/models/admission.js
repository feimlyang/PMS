const mongoose = require('mongoose')
const validator = require('validator')
const ObjectId = mongoose.Schema.Types.ObjectId


const Admission = mongoose.model('Admission', {
    _id: {
        type: ObjectId,
        required: true
    },
    requestedNurse: {
        type: ObjectId,
        required: true,
        ref: 'Nurse'
    },
    requestedPatient: {
        type: ObjectId,
        required: true,
        ref: 'Patient'
    },
    status: {
        type: String,
        enum: ['awaiting', 'admitted' ]
    },
    comment: {
        type: String
    }

})

module.exports = Admission