const express = require('express')
var cors = require('cors')

require('./mongoose.js')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000
const Nurse = require('./models/nurse')
const Patient = require('./models/patient')
const Division = require('./models/division')
const Admission = require('./models/admission')
const AdmissionQueue = require('./models/admissionQueue.js')

app.use(express.json(), cors())

//register a patient
app.post('/patient', async (req, res) => {
    const _id = new mongoose.Types.ObjectId()
    const patient = new Patient({
        _id: _id, ...req.body, isAdmitted: false
    })
    try{
        await patient.save()
        res.status(201).send(patient)
    }
    catch (error){
        res.status(400).send(error)
    }
})

//consult patient file
app.get('/patient/:id', async (req, res) => {
    const insuranceNum = req.params.id
    try {
        const patient = await Patient.findOne({insuranceNum: insuranceNum})
        if (!patient) {
            return res.status(404).send()
        }
        res.send(patient)
        
    } catch (error) {
        console.log('server error!', error)
        res.status(500).send()
    }
})

//admit a patient
app.post('/admission/admit', async (req, res) => {
    const {insuranceNum, bedNum, nurseId, comment} = req.body
    try{
        const nurse_id = new mongoose.Types.ObjectId(nurseId)
        const division = await Division.findOne({chargeNurse: nurse_id})
        if (!division){
            console.log("no such division")
            return res.status(404).send()
        }
        else if (division.status === 'completed'){
            return res.status(404).send("this division is full")
        }
        else if (division.beds[bedNum-1]) {
            return res.status(404).send("this bed is occupied")
        }
        else{
            const admission_id = new mongoose.Types.ObjectId()
            const requestedPatient = await Patient.findOneAndUpdate({insuranceNum: insuranceNum}, {isAdmitted: true})
         
            const admission = new Admission({
                _id: admission_id, 
                requestedNurse: nurse_id,
                requestedPatient: requestedPatient._id,
                status: 'admitted',
                comment: comment
            })
            await admission.save()

            await Division.update(
                {_id: division._id},
                {$set: {[`beds.${bedNum-1}`] : admission}}
            )

            return res.send("Successfully admitted patient")
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send('server error!')
    }
})

//admission request: add to waiting queue
app.put('/admission/request', async (req, res) => {
    const {insuranceNum, nurseId, comment} = req.body
    try{
        const nurse_id = new mongoose.Types.ObjectId(nurseId)
        const admission_id = new mongoose.Types.ObjectId()
        const requestedPatient = await Patient.findOneAndUpdate({insuranceNum: insuranceNum})
        const admission = new Admission({
            _id: admission_id, 
            requestedNurse: nurse_id,
            requestedPatient: requestedPatient._id,
            status: 'awaiting',
            comment: comment
        })
        await admission.save()
        await AdmissionQueue.update({
            $push: {"admissionQueue": admission}
        })
        return res.send("Sucessfully sent the request, awaiting to be reviewed")
    }
    catch(error){
        res.status(500).send('server error!')
    }
})

//check if patient is admitted
app.get('/patient/isAdmitted/:id', async (req, res) => {
    try{
        const patient = await Patient.findOne({insuranceNum: req.params.id})
        return res.send(patient.isAdmitted)
    }
    catch(error){
        console.log(error)
        res.status(500).send('server error!')
    }
})

//return available bed in charge nurse divsion
app.get('/division/:id', async (req, res) => {
    try{
        const division = await Division.findOne({chargeNurse: req.params.id})
        return res.send(division)
    }
    catch(error){
        res.status(500).send('server error!')
    }
})


app.listen(port, () => {


    // const nurse_id = new mongoose.Types.ObjectId()
    // const nurse = Nurse({_id:nurse_id ,name: 'tester', email: 'test@fdajo.com', password: 'testing'})
    // nurse.save()
 
    // const division = Division({
    //     divisionNumber: 1,
    //     chargeNurse: new mongoose.Types.ObjectId("5fcf540a30a51e1e887a92c7"),
    //     numOfBeds: 50,
    //     status: 'incompleted',
    //     beds: new Array(50)
    // })
    // division.save()

    // const admissionQueue = AdmissionQueue({admissionQueue: []})
    // admissionQueue.save()

    console.log('Server is up on port ' + port)
})