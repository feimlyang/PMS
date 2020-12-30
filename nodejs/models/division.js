const mongoose = require('mongoose')
const validator = require('validator')
const ObjectId = mongoose.Schema.Types.ObjectId


const Division = mongoose.model('Division', {
    divisionNumber: {
        type: Number,
        require: true
    },
    chargeNurse: {
        type: ObjectId,
        ref: 'Nurse',
        required: true
    },
    numOfBeds: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['completed', 'incompleted'],
        required: true
    },
    //index is the bed number
    beds: [{
        type: ObjectId, 
        ref: 'Admission'
    }]
})

module.exports = Division