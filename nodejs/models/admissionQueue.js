const mongoose = require('mongoose')
const validator = require('validator')
const ObjectId = mongoose.Schema.Types.ObjectId

//admission request to be reviewed
const AdmissionQueue = mongoose.model('AdmissionQueue', {
    admissionQueue: [{
        type: ObjectId,
        ref: 'Admission'
    }]
})

module.exports = AdmissionQueue