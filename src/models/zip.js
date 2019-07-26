const mongoose = require('mongoose')

const zipSchema = new mongoose.Schema({
    zipNumber: {
        type: Number,
        required: true,
        unique: true,
        validate(value) {
            if (!Number.isInteger(value) || value <= 0) {
                throw new Error('Zip number must be a positive integer.')
            }
        }
    },
    isHealthy: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

zipSchema.virtual('tasks', {
    ref: 'Task',
    localField: 'zipNumber',
    foreignField: 'zipNumber'
})

const Zip = mongoose.model('Zip', zipSchema)

module.exports = Zip