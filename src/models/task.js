const mongoose = require('mongoose')
const Zip = require('../models/zip')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    isBlocking: {
        type: Boolean,
        required: true
    },
    zipNumber: {
        type: Number,
        required: true,
        ref: 'Zip'
    }
}, {
    timestamps: true
})

taskSchema.pre('save', async function (next) {
    const task = this
    const zip = await Zip.findOne({ zipNumber: task.zipNumber })

    if (!zip) {
        return res.status(400).send({ error: 'Not a valid zip.' })
    }

    next()
})

taskSchema.post('save', async function () {
    const task = this
    await isFlightReady(task.zipNumber)
})

taskSchema.post('remove', async function () {
    const task = this
    await isFlightReady(task.zipNumber)
})

const isFlightReady = async (zipNumber) => {
    const zip = await Zip.findOne({ zipNumber })

    await zip.populate({
        path: 'tasks'
    }).execPopulate()

    zip.isHealthy = zip.tasks.every((task) => !task.isBlocking || task.isComplete)
    await zip.save()
}

const Task = mongoose.model('Task', taskSchema)

module.exports = Task