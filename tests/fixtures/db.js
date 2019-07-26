const mongoose = require('mongoose')
const Zip = require('../../src/models/zip')
const Task = require('../../src/models/task')

const zipOne = {
    zipNumber: 1
}

const zipTwo = {
    zipNumber: 2
}

const zipThree = {
    zipNumber: 3
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    zipNumber: 1,
    description: 'First task',
    isBlocking: false,
    isComplete: false
}

const taskTwo = {
    zipNumber: 1,
    description: 'Second task',
    isBlocking: false,
    isComplete: true
}

const taskThree = {
    zipNumber: 2,
    description: 'Third task',
    isBlocking: true,
    isComplete: false
}

const taskFour = {
    zipNumber: 2,
    description: 'Fourth task',
    isBlocking: true,
    isComplete: true
}

const taskFive = {
    zipNumber: 3,
    description: 'Fifth task',
    isBlocking: false,
    isComplete: true
}

const taskSix = {
    _id: new mongoose.Types.ObjectId(),
    zipNumber: 3,
    description: 'Sixth task',
    isBlocking: true,
    isComplete: false
}

const setupDatabase = async () => {
    await Zip.deleteMany()
    await Task.deleteMany()
    await new Zip(zipOne).save()
    await new Zip(zipTwo).save()
    await new Zip(zipThree).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
    await new Task(taskFour).save()
    await new Task(taskFive).save()
    await new Task(taskSix).save()
}

module.exports = {
    zipOne,
    zipTwo,
    zipThree,
    taskOne,
    taskTwo,
    taskThree,
    taskFour,
    taskFive,
    taskSix,
    setupDatabase
}